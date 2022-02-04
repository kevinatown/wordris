import { TileState, EMPTY_TILE, IBoard } from '../../types';
import Collapser from '../../service/Collapser';

describe('Collapser Tests', () => {

  const testTile = {
    value: 'A',
    state: TileState.FILLED,
  };

  const tileArray = [
    [testTile, EMPTY_TILE, EMPTY_TILE],
    [testTile, EMPTY_TILE, testTile],
    [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
  ];

  const testBoard = {
    tiles: tileArray,
  } as IBoard;

  let collapser: Collapser;

  beforeEach(() => {
    /*
     * Use beforeEach to reset the object to ensue that it is fresh
     */

    collapser = new Collapser(3 ,3);
  });

  it('Collapses the board correctly', () => {

    const { board } = collapser.collapseBoard(testBoard);

    const expectedTiles = [
      [EMPTY_TILE, EMPTY_TILE, testTile],
      [EMPTY_TILE, testTile, testTile],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
    ];
    expect(board.tiles).toEqual(expectedTiles);
  });

});
