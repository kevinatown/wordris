import {
  Movement,
  IBoard,
  Orientation,
  MoveResult,
  ITile,
  EMPTY_TILE,
  IPiece,
} from '../types';
import ITileMover from './interfaces/ITileMover';

class TileMover implements ITileMover {

  private pieceSize: number;
  private boardWidth: number;
  private boardHeight: number;

  constructor(pieceSize: number, boardWidth: number, boardHeight: number) {
    this.pieceSize = pieceSize;
    this.boardHeight = boardHeight;
    this.boardWidth = boardWidth;
  }

  public execMovement(board: Board, movement: Movement): { board: Board, moveResult: MoveResult } {
    const activePiece = board.activePiece;
    if (!board.activePiece) {
      return {
        board,
        moveResult: MoveResult.NO_ACTIVE_PIECE,
      };
    }

    let activeTilesInfo: ITileInfo[] = this.getActiveTiles(board, activePiece!);

    // If moving right and piece is horizontal, we want to move the rightmost tile first, so reverse the array.
    // The algorithm checks that the immediate tile to the right is empty, so if we
    // try to move the left first, we will hit the next tile in the piece.
    // Same rationale applies for moving down.
    if ((movement === Movement.RIGHT && board.activePiece!.orientation === Orientation.HORIZONTAL) ||
        (movement === Movement.DOWN && board.activePiece!.orientation === Orientation.VERTICAL)) {

      activeTilesInfo = activeTilesInfo.reverse();
    }

    let tiles = board.tiles;

    for (const activeTileInfo of activeTilesInfo) {
      const result = this.execMovementForTile(activeTileInfo, movement, tiles);

      if (result.moveResult !== MoveResult.SUCCESS) {
        return {
          board,
          moveResult: result.moveResult,
        };
      }

      tiles = result.tiles;
    }

    return {
      board: {
        tiles,
        activePiece: this.incrementActivePiece(activePiece!, movement),
      },
      moveResult: MoveResult.SUCCESS,
    };
  }

  public canMove(board: Board, movement: Movement): { moveResult: MoveResult } {
    const { moveResult } = this.execMovement(board, movement);
    return moveResult;
  }

  private incrementActivePiece(activePiece: Piece, movement: Movement): Piece {

    switch (movement) {
      case Movement.DOWN:
        return {
          orientation: activePiece.orientation,
          coord: {
            rowIndex: activePiece.coord.rowIndex + 1,
            colIndex: activePiece.coord.colIndex,
          },
        };

      case Movement.LEFT:
        return {
          orientation: activePiece.orientation,
          coord: {
            rowIndex: activePiece.coord.rowIndex,
            colIndex: activePiece.coord.colIndex - 1,
          },
        };

      case Movement.RIGHT:
        return {
          orientation: activePiece.orientation,
          coord: {
            rowIndex: activePiece.coord.rowIndex,
            colIndex: activePiece.coord.colIndex + 1,
          },
        };

      default:
        throw new Error('Unknown movement direction. This should be unreachable');
    }
  }

  private execMovementForTile(tileInfo: ITileInfo, movement: Movement,
                              tiles: Tile[][]): { tiles: Tile[][], moveResult: MoveResult } {

    switch (movement) {
      case Movement.DOWN:
        return this.moveDown(tileInfo, tiles);

      case Movement.LEFT:
        return this.moveLeft(tileInfo, tiles);

      case Movement.RIGHT:
        return this.moveRight(tileInfo, tiles);

      default:
        console.error('Unknown movement direction. This should be unreachable');
        return {
          tiles,
          moveResult: MoveResult.INVALID_MOVE,
        };
    }
  }

  private moveDown(tileInfo: ITileInfo, tiles: Tile[][]): { tiles: Tile[][], moveResult: MoveResult } {

    if (!(tileInfo.rowIdx + 1 < this.boardHeight
      && tiles[tileInfo.colIdx][tileInfo.rowIdx + 1] === EMPTY_TILE)) {

      return {
        tiles,
        moveResult: MoveResult.INVALID_MOVE,
      };
    }

    const newTiles = tiles.map(tileArr => tileArr.slice());
    newTiles[tileInfo.colIdx][tileInfo.rowIdx + 1] = newTiles[tileInfo.colIdx][tileInfo.rowIdx];
    newTiles[tileInfo.colIdx][tileInfo.rowIdx] = EMPTY_TILE;

    return {
      tiles: newTiles,
      moveResult: MoveResult.SUCCESS,
    };
  }

  private moveLeft(tileInfo: ITileInfo, tiles: Tile[][]): { tiles: Tile[][], moveResult: MoveResult } {

    if (!(tileInfo.colIdx - 1 >= 0
      && tiles[tileInfo.colIdx - 1][tileInfo.rowIdx] === EMPTY_TILE)) {

      return {
        tiles,
        moveResult: MoveResult.INVALID_MOVE,
      };
    }

    const newTiles = tiles.map(tileArr => tileArr.slice());
    newTiles[tileInfo.colIdx - 1][tileInfo.rowIdx] = newTiles[tileInfo.colIdx][tileInfo.rowIdx];
    newTiles[tileInfo.colIdx][tileInfo.rowIdx] = EMPTY_TILE;

    return {
      tiles: newTiles,
      moveResult: MoveResult.SUCCESS,
    };
  }

  private moveRight(tileInfo: ITileInfo, tiles: Tile[][]): { tiles: Tile[][], moveResult: MoveResult } {

    if (!(tileInfo.colIdx + 1 < this.boardWidth
      && tiles[tileInfo.colIdx + 1][tileInfo.rowIdx] === EMPTY_TILE)) {

      return {
        tiles,
        moveResult: MoveResult.INVALID_MOVE,
      };
    }

    const newTiles = tiles.map(tileArr => tileArr.slice());
    newTiles[tileInfo.colIdx + 1][tileInfo.rowIdx] = newTiles[tileInfo.colIdx][tileInfo.rowIdx];
    newTiles[tileInfo.colIdx][tileInfo.rowIdx] = EMPTY_TILE;

    return {
      tiles: newTiles,
      moveResult: MoveResult.SUCCESS,
    };
  }

  private getActiveTiles(board: Board, activePiece: Piece): ITileInfo[] {

    if (activePiece.orientation === Orientation.HORIZONTAL) {
      return this.getActiveHorizontalTiles(board, activePiece);
    }

    return this.getActiveVerticalTiles(board, activePiece);
  }

  private getActiveHorizontalTiles(board: Board, activePiece: Piece): ITileInfo[] {
    const ret: ITileInfo[] = [];

    for (let i = 0; i < this.pieceSize; i++) {
      ret.push({
        tile: board.tiles[activePiece.coord.colIndex + i][activePiece.coord.rowIndex],
        rowIdx: activePiece.coord.rowIndex,
        colIdx: activePiece.coord.colIndex + i,
      });
    }

    return ret;
  }

  private getActiveVerticalTiles(board: Board, activePiece: Piece): ITileInfo[] {
    const ret: any[] = [];

    for (let i = 0; i < this.pieceSize; i++) {
      ret.push({
        tile: board.tiles[activePiece.coord.colIndex][activePiece.coord.rowIndex + i],
        rowIdx: activePiece.coord.rowIndex + i,
        colIdx: activePiece.coord.colIndex,
      });
    }

    return ret;
  }
}

interface ITileInfo {
  tile: Tile;
  rowIdx: number;
  colIdx: number;
}

export default TileMover;
