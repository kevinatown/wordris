import IGameConfig from './GameConfig';
import IGameEngine, { EMIT_MESSAGES } from './interfaces/IGameEngine';
import GameEngine from './GameEngine';
import Collapser from './Collapser';
import NextLetterService from './NextLetterService';
import BoardGenerator from './BoardGenerator';
import WordChecker from './WordChecker';
import MatchClearer from './MatchClearer';
import LossChecker from './LossChecker';
import ScoreService from './ScoreService';
import TileMover from './TileMover';
import {
  IBoard,
  EMPTY_TILE,
} from '../types';

export default function createGameEngine(config: IGameConfig,
                                         e?: ({ message, data }:
                                           { message: EMIT_MESSAGES, data?: any }) => void): GameEngine {
  const emit = typeof e === 'function' ? e :
    ({ message, data }: { message: EMIT_MESSAGES, data?: any }) => { return; };
  const collapser = new Collapser(config.boardHeight, config.boardWidth);
  const nextLetterService = new NextLetterService(config.pieceSize,
                                                        config.bagHydrationAmt,
                                                        config.bagThreshold);
  const boardGenerator = new BoardGenerator(config.startingColIndexForNewPiece, nextLetterService);
  const tileMover = new TileMover(config.pieceSize, config.boardWidth, config.boardHeight);
  const wordChecker = new WordChecker(config.minMatchLength, config.boardWidth, config.boardHeight);
  const matchClearer = new MatchClearer();
  const lossChecker = new LossChecker(config.pieceSize, config.startingColIndexForNewPiece);
  const scoreService = new ScoreService(config.wordPerLevelThreshold, config.level);

  const gameEngine = new GameEngine(config,
                              emit,
                              initBoard(config),
                              collapser,
                              nextLetterService,
                              boardGenerator,
                              tileMover,
                              wordChecker,
                              matchClearer,
                              lossChecker,
                              scoreService);

  gameEngine.startGame();

  return gameEngine;
}

function initBoard(config: IGameConfig): IBoard {
  const tileArray = new Array(config.boardWidth);

  for (let i = 0; i < config.boardWidth; i++) {
    tileArray[i] = new Array(config.boardHeight);

    for (let j = 0; j < config.boardHeight; j++) {
      tileArray[i][j] = EMPTY_TILE;
    }
  }

  return {
    tiles: tileArray,
  };
}
