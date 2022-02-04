
export enum Orientation {
  VERTICAL,
  HORIZONTAL,
}

export interface IPiece {
  /**
   * If the piece is horizontal, coord is the left-most tile's pos
   * If the piece if vertical, coord is the top tile's pos
   */
  coord: ICoord;
  orientation: Orientation;
}

export interface ICoord {
  colIndex: number;
  rowIndex: number;
}
