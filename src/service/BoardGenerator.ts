import IBoardGenerator from './interfaces/IBoardGenerator';
import NextLetterService from './interfaces/INextLetterService';
import {
  TileState,
  IBoard,
  Orientation,
  ILetter,
} from '../types';

class BoardGenerator implements IBoardGenerator {

  private startingColIndexForNewPiece: number;
  private letterBag: NextLetterService;

  constructor(startingColIndexForNewPiece: number, letterBag: NextLetterService) {
    this.startingColIndexForNewPiece = startingColIndexForNewPiece;
    this.letterBag = letterBag;
  }

  public getNextBoard(board: IBoard): IBoard {

    const piece = {
      coord: {
        colIndex: this.startingColIndexForNewPiece,
        rowIndex: 0,
      },
      orientation: Orientation.HORIZONTAL,
    };

    this.letterBag.popNextLetters().forEach((letter: ILetter, i: number) => {
      const tile = {
        state: TileState.FILLED,
        value: letter,
      };

      board.tiles[this.startingColIndexForNewPiece + i][0] = tile;
    });

    board.activePiece = piece;

    return board;
  }

}

export default BoardGenerator;
