import Board from '../../types/Board';
import { IWord } from './IScoreService';
import Movement from '../../types/Movement';
import MoveResult from '../../types/MoveResult';
import ILetter from '../../types/Letter';

export default interface IGameEngine {
  board: Board;
  points: number;
  isPaused: boolean;
  isGameOver: boolean;
  scoredWords: IWord[];
  nextPieces: IUpcomingPiece[];
  startGame(): void;
  stepGame(): void;
  pauseGame(): void;
  handleMovement(movement: Movement): MoveResult;
}

export interface IUpcomingPiece {
  letters: ILetter[];
}

export enum EMIT_MESSAGES {
  'BOARD_CHANGED',
  'GAME_STARTED',
  'GAME_PAUSED',
  'GAME_OVER',
  'MATCH_SCORED',
}
