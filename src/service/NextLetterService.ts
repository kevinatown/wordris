import LetterBag from './LetterBag';
import ILetterBag from './interfaces/ILetterBag';
import { ILetter } from '../types';
import INextLetterService from './interfaces/INextLetterService';

class NextLetterService implements INextLetterService {

  private letterBag: ILetterBag;
  private nextLetters: ILetter[];
  private pieceSize: number;
  private amtToHydrate: number;

  constructor(pieceSize: number,
              amtToHydrate: number,
              bagThreshold: number,
              letterBag = new LetterBag(bagThreshold)) {
    this.letterBag = letterBag;
    this.nextLetters = [];
    this.pieceSize = pieceSize;
    this.amtToHydrate = amtToHydrate;
  }

  public peekNextLetters(amt: number = this.pieceSize): ILetter[] {

    if (amt <= this.nextLetters.length) {
      return this.nextLetters.slice(0, amt);
    }

    this.hydrateQueue(amt - this.nextLetters.length);
    return this.nextLetters;
  }

  public popNextLetters(numToPop: number = this.pieceSize) {

    const ret: ILetter[] = [];

    for (let i = 0; i < numToPop; i++) {
      ret.push(this.popNextLetter());
    }

    return ret;
  }

  private hydrateQueue(amtToFetch: number = this.amtToHydrate) {
    for (let i = 0; i < amtToFetch; i++) {
      this.nextLetters.push(this.letterBag.getLetter());
    }
  }

  private popNextLetter(): ILetter {
    if (this.nextLetters.length <= 0) {
      this.hydrateQueue(this.amtToHydrate);
    }

    return this.nextLetters.reverse().pop()!;
  }

}

export default NextLetterService;
