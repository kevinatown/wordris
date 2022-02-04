import IBoard from '../../types/Board';
import IMatch from '../../types/Match';

export default interface IMatchClearer {
  clearMatch(board: IBoard, match: IMatch): IBoard;
}
