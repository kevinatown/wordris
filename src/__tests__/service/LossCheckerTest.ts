import LossChecker from '../../service/LossChecker';
import {
    ITile,
    EMPTY_TILE,
    TileState,
    IBoard,
} from '../../types';

describe('Loss Checker', () => {

    let lossChecker: LossChecker;

    const FILLED_TILE: ITile = {
        state: TileState.FILLED,
        value: {
            count: 1,
            points: 1,
            char: 'E'
        }
    };

    beforeAll(() => {
        lossChecker = new LossChecker(3, 1);
    });

    it('Detects losses happy path', () => {

        const tiles: ITile[][] = [
            [ FILLED_TILE, FILLED_TILE, FILLED_TILE, FILLED_TILE, FILLED_TILE],
            [ EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
            [ EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
            [ EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
            [ EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE]
        ];

        const board: IBoard = {
            tiles: tiles
        };

        expect(lossChecker.hasPlayerLost(board)).toBe(false);

        tiles[1][0] = FILLED_TILE;

        expect(lossChecker.hasPlayerLost(board)).toBe(true);
    });

});