import ILossChecker from './interfaces/ILossChecker';
import { EMPTY_TILE, IBoard } from '../types';

class LossChecker implements ILossChecker {

  private pieceSize: number;
  private startingColIndexForNewPiece: number;

  constructor(pieceSize: number, startingColIndexForNewPiece: number) {
    this.pieceSize = pieceSize;
    this.startingColIndexForNewPiece = startingColIndexForNewPiece;
  }

  public hasPlayerLost(board: IBoard): boolean {
    for (let i = 0; i < this.pieceSize; i++) {
      if (board.tiles[this.startingColIndexForNewPiece + i][0] !== EMPTY_TILE) {
        return true;
      }
    }

    return false;
  }
}

export default LossChecker;
