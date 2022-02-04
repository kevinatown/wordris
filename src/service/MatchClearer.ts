import IMatchClearer from './interfaces/IMatchClearer';
import { EMPTY_TILE, IBoard, IMatch } from '../types';

class MatchClearer implements IMatchClearer {

  public clearMatch(board: IBoard, match: IMatch): IBoard {

    if (match.isHorizontal) {
      return this.clearRowMatch(board, match);
    }

    return this.clearColMatch(board, match);
  }

  private clearRowMatch(board: IBoard, match: IMatch): IBoard {

    for (let i = 0; i < match.matchVal.length; i++) {
      board.tiles[match.startColPos + i][match.startRowPos] = EMPTY_TILE;
    }

    return board;
  }

  private clearColMatch(board: IBoard, match: IMatch): IBoard {

    for (let i = 0; i < match.matchVal.length; i++) {
      board.tiles[match.startColPos][match.startRowPos + i] = EMPTY_TILE;
    }

    return board;
  }
}

export default MatchClearer;
