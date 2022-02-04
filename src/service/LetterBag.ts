import ILetterBag from './interfaces/ILetterBag';
import IShuffler from './interfaces/IShuffler';
import Shuffler from './Shuffler';
import { ALL_LETTERS, ILetter } from '../types/Letter';

class LetterBag implements ILetterBag {

  private initialLetters: ILetter[];
  private letterBag: ILetter[];
  private bagThreshold: number;
  private shuffler: IShuffler;

  constructor(bagThreshold: number,
              letters: ILetter[] = ALL_LETTERS,
              shuffler: IShuffler = new Shuffler()) {

        // TODO: Check that threshold is > 0
        // TODO: Check that letters isn't empty

    this.initialLetters = letters;
    this.letterBag = [];
    this.bagThreshold = bagThreshold;
    this.shuffler = shuffler;
  }

  public getLetter(): ILetter {

    if (this.letterBag.length < this.bagThreshold) {
      this.addBag();
    }

    return this.popFromFront();
  }

  private popFromFront(): ILetter {
    const letter = this.letterBag[0];
    this.letterBag = this.letterBag.slice(1, this.letterBag.length);

    return letter;
  }

  private addBag() {
    const bagToAdd: ILetter[] = [];

    this.initialLetters.forEach(letter => {
      for (let i = 0; i < letter.count; i++) {
        bagToAdd.push(letter);
      }
    });

    this.letterBag.push(...bagToAdd);
    this.letterBag = this.shuffler.shuffle(this.letterBag);
  }
}

export default LetterBag;
