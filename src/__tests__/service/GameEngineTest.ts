import IGameConfig, { GameConfigBuilder } from '../../service/GameConfig';
import GameEngine, { GameState } from '../../service/GameEngine';
import Collapser from '../../service/Collapser';
import BoardGenerator from '../../service/BoardGenerator';
import WordChecker from '../../service/WordChecker';
import MatchClearer from '../../service/MatchClearer';
import LossChecker from '../../service/LossChecker';
import ScoreService from '../../service/ScoreService';
import TileMover from '../../service/TileMover';
import INextLetterService from '../../service/interfaces/INextLetterService';
import {
    IBoard,
    Orientation,
    TileState,
    EMPTY_TILE,
    ILetter,
    ITile,
    MoveResult,
    Movement,
}from '../../types';

const C = {
    char: 'C',
    count: 1,
    points: 1,
};

const A = {
    char: 'A',
    count: 1,
    points: 2,
};

const B = {
    char: 'B',
    count: 1,
    points: 3,
};

const X = {
    char: 'X',
    count: 1,
    points: 4
};

const TEST_BOARD_HEIGHT = 5;
const TEST_BOARD_WIDTH = 5;
const TEST_BOARD_START_COL = 2;

describe("Game engine tests", () => {

    let config: IGameConfig
    let gameEngine: GameEngine;
    let testBoard: IBoard = initTestBoard(TEST_BOARD_HEIGHT, TEST_BOARD_WIDTH);
    let nextLetterService: INextLetterService;
    let collapser: Collapser;
    let boardGenerator: BoardGenerator;
    let tileMover: TileMover;
    let matchClearer: MatchClearer;
    let lossChecker: LossChecker;
    let scoreService: ScoreService;
    let wordChecker: WordChecker;
    const emit = ({ message, data }) => { return; }

    beforeAll(() => {

        const configBuilder: GameConfigBuilder = new GameConfigBuilder();
        configBuilder.pieceSize = 1;
        configBuilder.boardHeight = TEST_BOARD_HEIGHT;
        configBuilder.boardWidth = TEST_BOARD_WIDTH;
        configBuilder.startingColIndexForNewPiece = TEST_BOARD_START_COL;

        config = configBuilder.build();
        testBoard = initTestBoard(config.boardHeight, config.boardWidth);

        nextLetterService = mockNextLetterService();
        collapser = new Collapser(config.boardHeight, config.boardWidth);
        boardGenerator = new BoardGenerator(config.startingColIndexForNewPiece, nextLetterService)
        tileMover = new TileMover(config.pieceSize, config.boardWidth, config.boardHeight);
        wordChecker = new WordChecker(config.minMatchLength, config.boardWidth, config.boardHeight);
        matchClearer = new MatchClearer();
        lossChecker = new LossChecker(config.pieceSize, config.startingColIndexForNewPiece);
        scoreService = new ScoreService(config.wordPerLevelThreshold, config.level);
      
        gameEngine = new GameEngine(config,
                                    emit,
                                    testBoard,
                                    collapser,
                                    nextLetterService,
                                    boardGenerator,
                                    tileMover,
                                    wordChecker,
                                    matchClearer,
                                    lossChecker,
                                    scoreService);

    });

    // it('Plays a game correctly', () => {
    
    //     let board = testBoard;
    //     board = testPieceFallsCorrectly(gameEngine, board, B, TEST_BOARD_HEIGHT);
    //     // Step game out of SETTLED into READY
    //     gameEngine.stepGame();

    //     board = testPieceFallsCorrectly(gameEngine, board, A, TEST_BOARD_HEIGHT - 1);
    //     // STEP game out of SETTLED into READY
    //     gameEngine.stepGame();

    //     board = testPieceFallsCorrectly(gameEngine, board, C, TEST_BOARD_HEIGHT - 2);
 
    //     // Clear matches
    //     gameEngine.stepGame();
    //     board = initTestBoard(config.boardHeight, config.boardWidth);
    //     expect(gameEngine.board).toEqual(board);

    //     //gameEngine.stepGame();
    //     expect(gameEngine.points).toBe(6);
    //     expect(gameEngine.scoredWords).toEqual([{
    //         value: 'CAB',
    //         points: 6
    //     }]);

    //     for (let i = TEST_BOARD_HEIGHT; i > 0; i--) {
    //         board = testPieceFallsCorrectly(gameEngine, board, X, i);
    //         // Step game out of SETTLED into READY
    //         gameEngine.stepGame();
    //     };

    //     gameEngine.stepGame();
    //     expect(gameEngine.isGameOver).toBe(true);
    // });

    it('Collapse a col correctly', () => {

        let board = testBoard;
        board.tiles[0][TEST_BOARD_HEIGHT - 1] = getTileFromLetter(B);
        board.tiles[0][TEST_BOARD_HEIGHT - 2] = getTileFromLetter(A);
        board.tiles[0][TEST_BOARD_HEIGHT - 3] = getTileFromLetter(C);
        board.tiles[0][TEST_BOARD_HEIGHT - 4] = getTileFromLetter(X);

        gameEngine = new GameEngine(config,
                                    emit,
                                    board,
                                    collapser,
                                    nextLetterService,
                                    boardGenerator,
                                    tileMover,
                                    wordChecker,
                                    matchClearer,
                                    lossChecker,
                                    scoreService,
                                    GameState.SETTLED);

        gameEngine.stepGame();

        let expectedBoard = testBoard;
        expectedBoard.tiles[0][TEST_BOARD_HEIGHT - 1] = getTileFromLetter(X);

        expect(gameEngine.board).toEqual(expectedBoard);
    });

    // it('Handles movement correctly', () => {
        
    //     let board = initTestBoard(TEST_BOARD_HEIGHT, TEST_BOARD_WIDTH);
    //     board.tiles[0][0] = getTileFromLetter(B);

    //     const nls = {
    //         peekNextLetters: jest.fn(() => {
    //             return [];
    //         }),
    //         popNextLetters: jest.fn(() => {
    //             return [X];
    //         })
    //     }

    //     gameEngine = new GameEngine(config,
    //                                 emit,
    //                                 board,
    //                                 collapser,
    //                                 nls,
    //                                 boardGenerator,
    //                                 tileMover,
    //                                 wordChecker,
    //                                 matchClearer,
    //                                 lossChecker,
    //                                 scoreService,
    //                                 GameState.FALLING_TILE);

                    

    //     let result = gameEngine.handleMovement(Movement.DOWN);
    //     expect(result).toBe(MoveResult.NO_ACTIVE_PIECE);

    //     board.activePiece = {
    //         orientation: Orientation.HORIZONTAL,
    //         coord: {
    //             rowIndex: 0,
    //             colIndex: 0
    //         }
    //     }

    //     result = gameEngine.handleMovement(Movement.LEFT);
    //     expect(result).toEqual(MoveResult.INVALID_MOVE);
    //     expect(gameEngine.board).toEqual(board);

    //     let expectedBoard = initTestBoard(TEST_BOARD_HEIGHT, TEST_BOARD_WIDTH);
    //     expectedBoard.tiles[1][0] = getTileFromLetter(B);
    //     expectedBoard.activePiece = {
    //         orientation: Orientation.HORIZONTAL,
    //         coord: {
    //             rowIndex: 0,
    //             colIndex: 1
    //         }
    //     };

    //     result = gameEngine.handleMovement(Movement.RIGHT);
    //     expect(result).toBe(MoveResult.SUCCESS);
    //     expect(gameEngine.board).toEqual(expectedBoard);

    //     expectedBoard.tiles[1][0] = EMPTY_TILE;
    //     expectedBoard.tiles[0][0] = getTileFromLetter(B);
    //     expectedBoard.activePiece.coord.colIndex = 0;
    //     result = gameEngine.handleMovement(Movement.LEFT);
        
    //     expect(result).toBe(MoveResult.SUCCESS);
    //     expect(gameEngine.board).toEqual(expectedBoard);

        
    //     for (let i = 1; i < TEST_BOARD_HEIGHT; i++) {
    //         expectedBoard.tiles[0][i - 1] = EMPTY_TILE;
    //         expectedBoard.tiles[0][i] = getTileFromLetter(B);
    //         expectedBoard.activePiece.coord.rowIndex = i;
            
    //         result = gameEngine.handleMovement(Movement.DOWN);
            
    //         expect(result).toBe(MoveResult.SUCCESS);
    //         expect(gameEngine.board).toEqual(expectedBoard);
    //     }

    //     result = gameEngine.handleMovement(Movement.DOWN);
    //     expect(result).toBe(MoveResult.INVALID_MOVE);
    //     expect(gameEngine.board.activePiece).toBe(undefined);

    //     expectedBoard.tiles[TEST_BOARD_START_COL][0] = getTileFromLetter(X);
    //     expectedBoard.activePiece.coord.rowIndex = 0;
    //     expectedBoard.activePiece.coord.colIndex = TEST_BOARD_START_COL;

    //     gameEngine.stepGame();
    //     gameEngine.stepGame();

    //     expect(gameEngine.board).toEqual(expectedBoard);
    // });

});

function testPieceFallsCorrectly(gameEngine: GameEngine, testBoard: IBoard, letter: ILetter, heightToFall: number) {
        let expectedBoard = testBoard;

        for (let i = 0; i < heightToFall; i++) {

            gameEngine.stepGame();
            expectedBoard.tiles[TEST_BOARD_START_COL][i] = getTileFromLetter(letter);
            expectedBoard.activePiece = {
                orientation: Orientation.HORIZONTAL,
                coord: {
                    colIndex: TEST_BOARD_START_COL,
                    rowIndex: i
                }
            }

            if (i !== 0) {
                expectedBoard.tiles[TEST_BOARD_START_COL][i - 1] = EMPTY_TILE;
            }

            let actualBoard = gameEngine.board;
            expect(actualBoard).toEqual(expectedBoard);
        }

        // Step to clear active piece and set state to SETTLED
        gameEngine.stepGame();
        expectedBoard.activePiece = undefined;

        expect(gameEngine.board).toEqual(expectedBoard);

        return expectedBoard;
}

function initTestBoard(height: number, width: number): IBoard {
    const tiles: ITile[][] = [];

    for (let i = 0; i < width; i++) {
        const col: ITile[] = []

        for (let i = 0; i < height; i++) {
            col.push(EMPTY_TILE);
        }

        tiles.push(col);
    }

    return {
        tiles: tiles
    };
}

function getTileFromLetter(letter: ILetter): ITile {
    return {
        state: TileState.FILLED,
        value: letter
    }
}

function mockNextLetterService(): INextLetterService {

    let count = 0;

    return {
        peekNextLetters: jest.fn(() => {
            return [];
        }),
        popNextLetters: jest.fn(() => {
            if (count === 0) {
                count = count + 1;
                return [B];
            }

            if (count === 1) {
                count = count + 1;
                return [A];
            }

            if (count === 2) {
                count = count + 1;
                return [C];
            }

            return [X];
        })
    }
}