import NextLetterService from './interfaces/INextLetterService';
import IGameConfig from './GameConfig';
import IGameEngine, { IUpcomingPiece, EMIT_MESSAGES } from './interfaces/IGameEngine';
import IMatchClearer from './interfaces/IMatchClearer';
import IScoreService from './interfaces/IScoreService';
import ICollapser from './interfaces/ICollapser';
import ITileMover from './interfaces/ITileMover';
import IWordChecker from './interfaces/IWordChecker';
import ILossChecker from './interfaces/ILossChecker';
import IBoardGenerator from './interfaces/IBoardGenerator';
import {
  IBoard,
  ITile,
  ILetter,
  Movement,
  MoveResult,
} from '../types';

export enum GameState {
  READY_FOR_NEW_TILE,
  FALLING_TILE,
  SETTLED,
  LOST,
}

class GameEngine implements IGameEngine {

  private gameState: GameState;
  private _board: IBoard;
  private config: IGameConfig;
  private emit: ({ message, data }: { message: EMIT_MESSAGES, data?: any }) => void;
  private loop: NodeJS.Timeout | null = null;
  private _isPaused: boolean = false;

  private nextLetterService: NextLetterService;
  private matchClearer: IMatchClearer;
  private lossChecker: ILossChecker;
  private scoreService: IScoreService;
  private collapser: ICollapser;
  private tileMover: ITileMover;
  private boardGenerator: IBoardGenerator;
  private wordChecker: IWordChecker;

  constructor(config: IGameConfig,
              e: ({ message, data }: {message: EMIT_MESSAGES, data?: any}) => void,
              board: IBoard,
              collapser: ICollapser,
              nextLetterService: NextLetterService,
              boardGenerator: IBoardGenerator,
              tileMover: ITileMover,
              wordChecker: IWordChecker,
              matchClearer: IMatchClearer,
              lossChecker: ILossChecker,
              scoreService: IScoreService,
              initialState: GameState = GameState.READY_FOR_NEW_TILE) {

    this._board = board;
    this.emit = e;
    this.config = config;
    this.collapser = collapser;
    this.nextLetterService = nextLetterService;
    this.boardGenerator = boardGenerator;
    this.tileMover = tileMover;
    this.wordChecker = wordChecker;
    this.matchClearer = matchClearer;
    this.lossChecker = lossChecker;
    this.gameState = initialState;
    this.stepGame = this.stepGame.bind(this);
    this.getTile = this.getTile.bind(this);
    this.scoreService = scoreService;
  }

  get board() {
    return this._board;
  }

  get points() {
    return this.scoreService.totalPoints;
  }

  get isPaused() {
    return this._isPaused;
  }

  get isGameOver() {
    return this.gameState === GameState.LOST;
  }

  get scoredWords() {
    return this.scoreService.wordsScored;
  }

  get nextPieces() {
    const ret: IUpcomingPiece[] = [];

    const nextLettersFlattened =
      this.nextLetterService.peekNextLetters(this.config.piecesToPreview * this.config.pieceSize);

    for (let i = 0; i < this.config.piecesToPreview; i++) {
      const piece: ILetter[] = [];

      for (let j = 0; j < this.config.pieceSize; j++) {
        piece.push(nextLettersFlattened[i * j + j]);
      }

      ret.push({
        letters: piece,
      });
    }
    return ret;
  }

  get nextPiece() {
    return this.nextPieces[0];
  }

  get level() {
    return this.scoreService.level;
  }

  public getTile(row: number, col: number): ITile {
    return this.board.tiles[col][row];
  }

  public toggleGameState() {
    this.isPaused ? this.startGame() : this.pauseGame();
  }

  public pauseGame() {
    if (!!this.loop) {
      clearInterval(this.loop);
      this._isPaused = true;
      this.loop = null;
      this.emit({ message: EMIT_MESSAGES.GAME_PAUSED });
    }
  }

  public startGame() {
    if (!this.loop) {
      this.setLoopInterval();
      this._isPaused = false;
      this.emit({ message: EMIT_MESSAGES.GAME_STARTED });
    }
  }

  public stepGame() {

    switch (this.gameState) {

      case GameState.READY_FOR_NEW_TILE:

        if (this.lossChecker.hasPlayerLost(this.board)) {
          this.gameState = GameState.LOST;
          this.emit({ message: EMIT_MESSAGES.GAME_OVER });
        } else {
          this._board = this.boardGenerator.getNextBoard(this.board);
          this.gameState = GameState.FALLING_TILE;
        }
        break;

      case GameState.FALLING_TILE:
        const result = this.tileMover.execMovement(this.board, Movement.DOWN);

        if (result.moveResult === MoveResult.INVALID_MOVE) {
          this.gameState = GameState.SETTLED;
        } else {
          this._board = result.board;
          const canNext = this.tileMover.canMove(this.board, Movement.DOWN);

          if (canNext === MoveResult.INVALID_MOVE) {
            this.gameState = GameState.SETTLED;
            this.checkForMatches();
          }
        }
        break;

      case GameState.SETTLED:
        this.checkForMatches();
        break;

      default:
        break;
    }

    this.emit({ message: EMIT_MESSAGES.BOARD_CHANGED, data: { board: this.board } });
  }

  public handleMovement(movement: Movement): MoveResult {
    if (this.gameState === GameState.SETTLED || this.isPaused) {
      return MoveResult.INVALID_MOVE;
    }

    const result = this.tileMover.execMovement(this.board, movement);
    if (result.moveResult === MoveResult.SUCCESS) {
      this._board = result.board;
      const canNext = this.tileMover.canMove(this.board, Movement.DOWN);

      if (canNext === MoveResult.INVALID_MOVE && movement === Movement.DOWN) {
        this.gameState = GameState.SETTLED;
        this.checkForMatches();
      }
    } else if (movement === Movement.DOWN && result.moveResult === MoveResult.INVALID_MOVE) {
      this.gameState = GameState.SETTLED;
      this.checkForMatches();
    }

    this.emit({ message: EMIT_MESSAGES.BOARD_CHANGED, data: { board: this.board } });
    return result.moveResult;
  }

  private setLoopInterval() {
    if (!!this.loop) {
      clearInterval(this.loop);
    }
    this.loop = setInterval(this.stepGame, this.scoreService.tickInterval);
  }

  private checkForMatches() {
    let matches = this.wordChecker.findMatches(this.board);

    while (matches.length > 0) {

      matches.forEach(match => {
        this.scoreService.scoreMatch(match);
        this.emit({ message: EMIT_MESSAGES.MATCH_SCORED, data: { match } });
        this._board = this.matchClearer.clearMatch(this.board, match);
      });

      const { board, tilesMoved } = this.collapser.collapseBoard(this.board);
      this._board = board;
      matches = this.wordChecker.findMultiMatches(this.board, tilesMoved);
    }
    this.resetGame();
  }

  private resetGame() {
    this.gameState = GameState.READY_FOR_NEW_TILE;
    this.board.activePiece = undefined;
    this.stepGame();
    this.setLoopInterval();
  }
}

export default GameEngine;
