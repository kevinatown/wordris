import ITile from './Tile';
import IPiece from './Piece';

export interface IBoard {
    /**
     * an array of board columns (array of tiles)
     * the top left of the board is [0][0] and the bottom
     * right is [max height - 1][max width - 1]
     */
  tiles: ITile[][];
  activePiece?: IPiece;
}
