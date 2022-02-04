import ICollapser, { ICollapsedBoard, ITileMoved } from './interfaces/ICollapser';
import {
  TileState,
  IBoard,
  ITile,
  EMPTY_TILE,
} from '../types';

class Collapser implements ICollapser  {

  private boardWidth: number;
  private boardHeight: number;

  constructor(boardHeight: number, boardWidth: number) {
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
  }

  public collapseBoard(board: IBoard): ICollapsedBoard {
    const tilesMoved: ITileMoved[] = [];
    for (let i = 0; i < this.boardWidth; i++) {
      const { newCol, moved } = this.collapseCol(board.tiles[i]);
      if (moved !== undefined) {
        board.tiles[i] = newCol;
        tilesMoved.push({ coord: { colIndex: i, rowIndex: moved }});
      }
    }

    return { board, tilesMoved };
  }

  private collapseCol = (col: ITile[]): ITile[] => {

    const newCol: ITile[] = Array(this.boardHeight);
    let moved;

    for (let i = 0; i < this.boardHeight; i++) {
      newCol[i] = EMPTY_TILE;
    }

    let j = this.boardHeight - 1;
    for (let i = this.boardHeight - 1; i >= 0; i--) {
      if (col[i].state === TileState.FILLED) {
        moved = j;
        newCol[j] = col[i];
        j--;
      }
    }

    return { newCol, moved };
  }
}

export default Collapser;
