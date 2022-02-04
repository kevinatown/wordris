import Board from '../../types/Board';

export default interface ILossChecker {
  hasPlayerLost(board: Board): boolean;
}
