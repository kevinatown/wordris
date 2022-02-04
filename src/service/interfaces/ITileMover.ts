import IMovement from '../../types/Movement';
import IBoard from '../../types/Board';
import IMoveResult from '../../types/MoveResult';

export default interface ITileMover {
  execMovement(board: IBoard, movement: IMovement): { board: IBoard, moveResult: IMoveResult };
}
