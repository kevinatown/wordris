import IBoard from '../../types/Board';

export default interface IBoardGenerator {
  getNextBoard(board: IBoard): IBoard;
}
