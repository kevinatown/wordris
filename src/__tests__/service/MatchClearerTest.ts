import {
  TileState,
  EMPTY_TILE,
  IBoard,
  IMatch,
} from '../../types';
import MatchClearer from '../../service/MatchClearer';

describe('MatchClearer', () => {

  const matchClearer: MatchClearer = new MatchClearer();
  let testBoard: IBoard;

  const testTile = {
    value: 'A',
    state: TileState.FILLED,
  };

  beforeEach(() => {

    const tileArray = [
        [testTile, EMPTY_TILE, EMPTY_TILE],
        [testTile, testTile, testTile],
        [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
    ];

    testBoard = {
        tiles: tileArray,
    } as IBoard;
  });

  it('Clears vertical match correctly', () => {

    const match = {
        startRowPos: 1,
        startColPos: 1,
        isHorizontal: false,
        matchVal: 'AA',
    } as IMatch;

    const actualBoard = matchClearer.clearMatch(testBoard, match);

    const expectedTiles = [
        [testTile, EMPTY_TILE, EMPTY_TILE],
        [testTile, EMPTY_TILE, EMPTY_TILE],
        [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
    ];

    expect(actualBoard.tiles).toEqual(expectedTiles);
  });

  it('Clears horizontal match correctly', () => {

    const match = {
        startRowPos: 0,
        startColPos: 0,
        isHorizontal: true,
        matchVal: 'AA',
    } as IMatch;

    const actualBoard = matchClearer.clearMatch(testBoard, match);

    const expectedTiles = [
        [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
        [EMPTY_TILE, testTile, testTile],
        [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
    ];

    expect(actualBoard.tiles).toEqual(expectedTiles);
  });

});
