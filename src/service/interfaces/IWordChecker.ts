import IBoard from '../../types/Board';
import IMatch from '../../types/Match';

export default interface IWordChecker {
  findMatches(board: IBoard): IMatch[];
}
