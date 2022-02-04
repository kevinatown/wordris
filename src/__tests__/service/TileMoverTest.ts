import ITileMover from '../../service/interfaces/ITileMover';
import TileMover from '../../service/TileMover';
import {
    Movement,
    Orientation,
    MoveResult,
    ALL_LETTERS,
    ITile,
    TileState,
    EMPTY_TILE,
} from '../../types';

describe('Tile Mover Tests', () => {
    const C = {
        value: ALL_LETTERS.find(letter => letter.char === 'C'),
        state: TileState.FILLED
    }
  
    const A = {
        value: ALL_LETTERS.find(letter => letter.char === 'A'),
        state: TileState.FILLED
    }
  
    const B = {
        value: ALL_LETTERS.find(letter => letter.char === 'B'),
        state: TileState.FILLED
    }

    const initBaseTiles = () => {
        return [
            [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
            [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
            [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
            [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
            [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
        ];
    }

    let baseTiles: ITile[][] = initBaseTiles();

    let tileMover: ITileMover = new TileMover(3, 5, 5);

    beforeEach(() => {
        tileMover = new TileMover(3, 5, 5);
        baseTiles = initBaseTiles();
    });

    it('moves left horizontal happy path', () => {

        baseTiles[2][0] = C;
        baseTiles[3][0] = A;
        baseTiles[4][0] = B;

        const board = {
            activePiece: {
                coord: {
                    colIndex: 2,
                    rowIndex: 0,
                },
                orientation: Orientation.HORIZONTAL,
            },
            tiles: baseTiles
        };

        const result = tileMover.execMovement(board, Movement.LEFT);

        const expected = initBaseTiles();
        expected[1][0] = C;
        expected[2][0] = A;
        expected[3][0] = B;

        const expectedBoard = {
            activePiece: {
                coord: {
                    colIndex: 1,
                    rowIndex: 0,
                },
                orientation: Orientation.HORIZONTAL,
            },
            tiles: expected
        }

        expect(MoveResult.SUCCESS).toEqual(result.moveResult);
        expect(expectedBoard).toEqual(result.board);
    });

    it('moves left vertical happy path', () => {

        baseTiles[1][1] = C;
        baseTiles[1][2] = A;
        baseTiles[1][3] = B;

        const board = {
            activePiece: {
                coord: {
                    colIndex: 1,
                    rowIndex: 1,
                },
                orientation: Orientation.VERTICAL,
            },
            tiles: baseTiles
        };

        const result = tileMover.execMovement(board, Movement.LEFT);

        const expected = initBaseTiles();
        expected[0][1] = C;
        expected[0][2] = A;
        expected[0][3] = B;

        const expectedBoard = {
            activePiece: {
                coord: {
                    colIndex: 0,
                    rowIndex: 1,
                },
                orientation: Orientation.VERTICAL,
            },
            tiles: expected
        }

        expect(MoveResult.SUCCESS).toEqual(result.moveResult);
        expect(expectedBoard).toEqual(result.board);
    });

    it('fails correctly to move left when at edge of board', () => {

        baseTiles[0][1] = C;
        baseTiles[0][2] = A;
        baseTiles[0][3] = B;

        const board = {
            activePiece: {
                coord: {
                    colIndex: 0,
                    rowIndex: 1,
                },
                orientation: Orientation.VERTICAL,
            },
            tiles: baseTiles
        };

        const result = tileMover.execMovement(board, Movement.LEFT);

        expect(MoveResult.INVALID_MOVE).toEqual(result.moveResult);
    });

    it('fails correctly to move left when a tile is in the way', () => {

        // Active piece
        baseTiles[1][1] = C;
        baseTiles[1][2] = A;
        baseTiles[1][3] = B;
        
        // Tile in the way
        baseTiles[0][2] = C;

        const board = {
            activePiece: {
                coord: {
                    colIndex: 1,
                    rowIndex: 1,
                },
                orientation: Orientation.VERTICAL,
            },
            tiles: baseTiles
        };

        const result = tileMover.execMovement(board, Movement.LEFT);

        expect(MoveResult.INVALID_MOVE).toEqual(result.moveResult);
    });

    it('moves right horizontal happy path', () => {

        baseTiles[1][0] = C;
        baseTiles[2][0] = A;
        baseTiles[3][0] = B;

        const board = {
            activePiece: {
                coord: {
                    colIndex: 1,
                    rowIndex: 0,
                },
                orientation: Orientation.HORIZONTAL,
            },
            tiles: baseTiles
        };

        const result = tileMover.execMovement(board, Movement.RIGHT);

        const expected = initBaseTiles();
        expected[2][0] = C;
        expected[3][0] = A;
        expected[4][0] = B;

        const expectedBoard = {
            activePiece: {
                coord: {
                    colIndex: 2,
                    rowIndex: 0,
                },
                orientation: Orientation.HORIZONTAL,
            },
            tiles: expected
        }

        expect(MoveResult.SUCCESS).toEqual(result.moveResult);
        expect(expectedBoard).toEqual(result.board);
    });

    it('moves right vertical happy path', () => {

        baseTiles[1][1] = C;
        baseTiles[1][2] = A;
        baseTiles[1][3] = B;

        const board = {
            activePiece: {
                coord: {
                    colIndex: 1,
                    rowIndex: 1,
                },
                orientation: Orientation.VERTICAL,
            },
            tiles: baseTiles
        };

        const result = tileMover.execMovement(board, Movement.RIGHT);

        const expected = initBaseTiles();
        expected[2][1] = C;
        expected[2][2] = A;
        expected[2][3] = B;

        const expectedBoard = {
            activePiece: {
                coord: {
                    colIndex: 2,
                    rowIndex: 1,
                },
                orientation: Orientation.VERTICAL,
            },
            tiles: expected
        }

        expect(MoveResult.SUCCESS).toEqual(result.moveResult);
        expect(expectedBoard).toEqual(result.board);
    });

    it('fails correctly to move right when at edge of board', () => {

        baseTiles[4][1] = C;
        baseTiles[4][2] = A;
        baseTiles[4][3] = B;

        const board = {
            activePiece: {
                coord: {
                    colIndex: 4,
                    rowIndex: 1,
                },
                orientation: Orientation.VERTICAL,
            },
            tiles: baseTiles
        };

        const result = tileMover.execMovement(board, Movement.RIGHT);

        expect(MoveResult.INVALID_MOVE).toEqual(result.moveResult);
    });

    it('fails correctly to move right when a tile is in the way', () => {

        // Active piece
        baseTiles[0][1] = C;
        baseTiles[0][2] = A;
        baseTiles[0][3] = B;

        // Tile in the way
        baseTiles[1][2] = C;

        const board = {
            activePiece: {
                coord: {
                    colIndex: 0,
                    rowIndex: 1,
                },
                orientation: Orientation.VERTICAL,
            },
            tiles: baseTiles
        };

        const result = tileMover.execMovement(board, Movement.RIGHT);

        expect(MoveResult.INVALID_MOVE).toEqual(result.moveResult);
    });

    it('moves down horizontal happy path', () => {

        baseTiles[1][0] = C;
        baseTiles[2][0] = A;
        baseTiles[3][0] = B;

        const board = {
            activePiece: {
                coord: {
                    colIndex: 1,
                    rowIndex: 0,
                },
                orientation: Orientation.HORIZONTAL,
            },
            tiles: baseTiles
        };

        const result = tileMover.execMovement(board, Movement.DOWN);

        const expected = initBaseTiles();
        expected[1][1] = C;
        expected[2][1] = A;
        expected[3][1] = B;

        const expectedBoard = {
            activePiece: {
                coord: {
                    colIndex: 1,
                    rowIndex: 1,
                },
                orientation: Orientation.HORIZONTAL,
            },
            tiles: expected
        }

        expect(MoveResult.SUCCESS).toEqual(result.moveResult);
        expect(expectedBoard).toEqual(result.board);
    });

    it('moves down vertical happy path', () => {

        baseTiles[1][0] = C;
        baseTiles[1][1] = A;
        baseTiles[1][2] = B;

        const board = {
            activePiece: {
                coord: {
                    colIndex: 1,
                    rowIndex: 0,
                },
                orientation: Orientation.VERTICAL,
            },
            tiles: baseTiles
        };

        const result = tileMover.execMovement(board, Movement.DOWN);

        const expected = initBaseTiles();
        expected[1][1] = C;
        expected[1][2] = A;
        expected[1][3] = B;

        const expectedBoard = {
            activePiece: {
                coord: {
                    colIndex: 1,
                    rowIndex: 1,
                },
                orientation: Orientation.VERTICAL,
            },
            tiles: expected
        }

        expect(MoveResult.SUCCESS).toEqual(result.moveResult);
        expect(expectedBoard).toEqual(result.board);
    });

    it('fails correctly to move down when at edge of board', () => {

        baseTiles[4][2] = C;
        baseTiles[4][3] = A;
        baseTiles[4][4] = B;

        const board = {
            activePiece: {
                coord: {
                    colIndex: 4,
                    rowIndex: 2,
                },
                orientation: Orientation.VERTICAL,
            },
            tiles: baseTiles
        };

        const result = tileMover.execMovement(board, Movement.DOWN);

        expect(MoveResult.INVALID_MOVE).toEqual(result.moveResult);
    });

    it('fails correctly to move down when a tile is in the way', () => {

        // Active piece
        baseTiles[0][1] = C;
        baseTiles[0][2] = A;
        baseTiles[0][3] = B;

        // Tile in the way
        baseTiles[0][4] = C;

        const board = {
            activePiece: {
                coord: {
                    colIndex: 0,
                    rowIndex: 1,
                },
                orientation: Orientation.VERTICAL,
            },
            tiles: baseTiles
        };

        const result = tileMover.execMovement(board, Movement.DOWN);

        expect(MoveResult.INVALID_MOVE).toEqual(result.moveResult);
    });
});

export const printTiles = (tiles: ITile[][]) => {
    console.log(tiles.map(col => {
        return col.map(tile => !!tile.value ? tile.value.char : '')
    }));
}
