import {
  TileState,
  EMPTY_TILE,
  ALL_LETTERS,
  WILDCARD,
} from '../../types';
import WordChecker from '../../service/WordChecker';

const H = {
    value: ALL_LETTERS.find(letter => letter.char === 'H'),
    state: TileState.FILLED
};

const E = {
    value: ALL_LETTERS.find(letter => letter.char === 'E'),
    state: TileState.FILLED
};

const Y = {
    value: ALL_LETTERS.find(letter => letter.char === 'Y'),
    state: TileState.FILLED
};

const A = {
  value: ALL_LETTERS.find(letter => letter.char === 'A'),
  state: TileState.FILLED
};

const R = {
    value: ALL_LETTERS.find(letter => letter.char === 'R'),
    state: TileState.FILLED
};

const N = {
  value: ALL_LETTERS.find(letter => letter.char === 'N'),
  state: TileState.FILLED
};

const B = {
      value: ALL_LETTERS.find(letter => letter.char === 'B'),
      state: TileState.FILLED,
  };

const C = {
    value: ALL_LETTERS.find(letter => letter.char === 'C'),
    state: TileState.FILLED,
};

const S = {
    value: ALL_LETTERS.find(letter => letter.char === 'S'),
    state: TileState.FILLED
};

const W = {
  value: ALL_LETTERS.find(letter => letter.char === 'W'),
  state: TileState.FILLED
};

const O = {
  value: ALL_LETTERS.find(letter => letter.char === 'O'),
  state: TileState.FILLED
};

const U = {
  value: ALL_LETTERS.find(letter => letter.char === 'U'),
  state: TileState.FILLED
};

const T = {
  value: ALL_LETTERS.find(letter => letter.char === 'T'),
  state: TileState.FILLED
};

const WILDCARD_TILE = {
  value: WILDCARD,
  state: TileState.FILLED
};



describe('WordCheckerTests', () => {

  it('Finds a column match correctly', () => {

    const tileArray = [
      [EMPTY_TILE, EMPTY_TILE, C, A, B],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
    ];

    const testBoard = {
      tiles: tileArray,
      activePiece: {
        coord: {
          colIndex: 0,
          rowIndex: 2
        }
      },
    };

    const expectedMatches = [{
        actualVal: 'CAB',
        matchVal: 'CAB',
        points: 7,
        startRowPos: 2,
        startColPos: 0,
        isHorizontal: false,
    }];

    const checker = new WordChecker(2, 5, 5);

    const matches = checker.findMatches(testBoard);
    expect(matches).toEqual(expectedMatches);

  });

  it('Finds a row match correctly', () => {

    const tileArray = [
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, C],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, A],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, B],
    ];

    const testBoard = {
      tiles: tileArray,
      activePiece: {
        coord: {
          colIndex: 2,
          rowIndex: 4
        }
      }
    };

    const expectedMatches = [{
        actualVal: 'CAB',
        matchVal: 'CAB',
        points: 7,
        startRowPos: 4,
        startColPos: 2,
        isHorizontal: true,
    }];

    const checker = new WordChecker(2, 5, 5);

    const matches = checker.findMatches(testBoard);

    expect(matches).toEqual(expectedMatches);

  });


  it('Finds a row match correctly with space', () => {

    const tileArray = [
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, H],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, H],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, H],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, C],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, A],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, B],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
    ];

    const testBoard = {
      tiles: tileArray,
      activePiece: {
        coord: {
          colIndex: 5,
          rowIndex: 4
        }
      }
    };

    const expectedMatches = [{
        actualVal: 'CAB',
        matchVal: 'CAB',
        points: 7,
        startRowPos: 4,
        startColPos: 5,
        isHorizontal: true,
    }];

    const checker = new WordChecker(2, 9, 5);

    const matches = checker.findMatches(testBoard);

    expect(matches).toEqual(expectedMatches);

  });

it('Respects the min match length', () => {

    const tileArray = [
      [EMPTY_TILE, EMPTY_TILE, C, A, B],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
    ];

    const testBoard = {
      tiles: tileArray,
      activePiece: {
        coord: {
          colIndex: 0,
          rowIndex: 3
        }
      }
    };

    const checker = new WordChecker(10, 5, 5);

    const matches = checker.findMatches(testBoard);
  
    expect(matches).toEqual([])
  
  });

  it('Finds multiple intersecting matches correctly', () => {
  
    const tileArray = [
      [EMPTY_TILE, EMPTY_TILE, C, A, B],
      [EMPTY_TILE, EMPTY_TILE, A, H, H],
      [EMPTY_TILE, EMPTY_TILE, R, H, H],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE]
    ]
  
    const testBoard = {
      tiles: tileArray,
      activePiece: {
        coord: {
          colIndex: 0,
          rowIndex: 2
        }
      }
    }

    const checker = new WordChecker(2, 5, 5);
  
    const matches = checker.findMatches(testBoard);

    const expectedMatches = [
      {
        actualVal: 'CAB',
        matchVal: 'CAB',
        points: 7,
        startRowPos: 2,
        startColPos: 0,
        isHorizontal: false,
      },
      {
        actualVal: 'CAR',
        matchVal: 'CAR',
        points: 5,
        startRowPos: 2,
        startColPos: 0,
        isHorizontal: true,
      }
    ]
  
    expect(matches).toEqual(expectedMatches)
  
  });

  it('Finds multiple overlapping matches correctly', () => {
  
    const tileArray = [
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, H],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, E],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, Y],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, A],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, R],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, N]
    ]
  
    const testBoard = {
      tiles: tileArray,
      activePiece: {
        coord: {
          colIndex: 2,
          rowIndex: 5
        }
      }
    }

    const checker = new WordChecker(3, 6, 6);
  
    const matches = checker.findMatches(testBoard);

    const expectedMatches = [
      {
        actualVal: 'HEY',
        matchVal: 'HEY',
        points: 9,
        startRowPos: 5,
        startColPos: 0,
        isHorizontal: true,
      },
      {
        actualVal: 'YARN',
        matchVal: 'YARN',
        points: 7,
        startRowPos: 5,
        startColPos: 2,
        isHorizontal: true,
      }
    ]
  
    expect(matches).toEqual(expectedMatches)
  
  });

  it('Filters out duplicate and subset matches on columns', () => {
  
    const tileArray = [
      [S, E, E, S, A, W],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE]
    ]
  
    const testBoard = {
      tiles: tileArray,
      activePiece: {
        coord: {
          colIndex: 0,
          rowIndex: 0
        }
      }
    }

    const checker = new WordChecker(3, 6, 6);
  
    const matches = checker.findMatches(testBoard);

    const expectedMatches = [
      {
        actualVal: 'SEESAW',
        matchVal: 'SEESAW',
        points: 9,
        startRowPos: 0,
        startColPos: 0,
        isHorizontal: false,
      }
    ]
  
    expect(matches).toEqual(expectedMatches)
  
  });


  it('Filters out duplicate and subset matches on rows', () => {
  
    const tileArray = [
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, S],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, E],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, E],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, S],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, A],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, W]
    ]
  
    const testBoard = {
      tiles: tileArray,
      activePiece: {
        coord: {
          colIndex: 0,
          rowIndex: 5
        }
      }
    }

    const checker = new WordChecker(3, 6, 6);
  
    const matches = checker.findMatches(testBoard);

    const expectedMatches = [
      {
        actualVal: 'SEESAW',
        matchVal: 'SEESAW',
        points: 9,
        startRowPos: 5,
        startColPos: 0,
        isHorizontal: true,
      }
    ]
  
    expect(matches).toEqual(expectedMatches)
  
  });

  it('Filters out semi substrings, C-A-B-O-U-T', () => {
  
    const tileArray = [
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, C],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, A],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, B],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, O],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, U],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, T]
    ]
  
    const testBoard = {
      tiles: tileArray,
      activePiece: {
        coord: {
          colIndex: 1,
          rowIndex: 5
        }
      }
    }

    const checker = new WordChecker(3, 6, 6);
  
    const matches = checker.findMatches(testBoard);

    const expectedMatches = [
      {
        actualVal: 'ABOUT',
        matchVal: 'ABOUT',
        points: 7,
        startRowPos: 5,
        startColPos: 1,
        isHorizontal: true,
      }
    ]
  
    expect(matches).toEqual(expectedMatches)
  
  });

  it('Respects wildcards correctly', () => {

    const tileArray = [
      [S, WILDCARD_TILE, E, S, A, W],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE]
    ]

    const testBoard = {
      tiles: tileArray,
      activePiece: {
        coord: {
          colIndex: 0,
          rowIndex: 0
        }
      }
    }

    const checker = new WordChecker(3, 6, 6);

    const matches = checker.findMatches(testBoard);

    const expectedMatches = [
      {
        actualVal: 'S*ESAW',
        matchVal: 'SEESAW',
        points: 8,
        startRowPos: 0,
        startColPos: 0,
        isHorizontal: false,
      }
    ]

    expect(matches).toEqual(expectedMatches);

  });

  it('Does not include 2 wildcards correctly', () => {

    const tileArray = [
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, C, WILDCARD_TILE, WILDCARD_TILE],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
      [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE, EMPTY_TILE]
    ]

    const testBoard = {
      tiles: tileArray,
      activePiece: {
        coord: {
          colIndex: 0,
          rowIndex: 0
        }
      }
    }

    const checker = new WordChecker(3, 6, 6);

    const matches = checker.findMatches(testBoard);

    const expectedMatches = [];

    expect(matches).toEqual(expectedMatches);

  });
});