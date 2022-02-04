
import Letter from '../../types/Letter';

export default interface INextLetterService {
  peekNextLetters(amt: number): Letter[];
  popNextLetters(numToPop: number): void;
}
