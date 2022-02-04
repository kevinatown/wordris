import IBoard from '../../types/Board';

export interface ITileMoved {
  coord: {
    colIndex: number;
    rowIndex: number;
  };
}

export interface ICollapsedBoard {
  tilesMoved: ITileMoved[];
  board: IBoard;
}

export default interface ICollapser {
  collapseBoard(board: IBoard): ICollapsedBoard;
}
