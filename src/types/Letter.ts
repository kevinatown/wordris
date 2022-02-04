export interface ILetter {
  char: string;
  count: number;
  points: number;
}

export const WILDCARD: ILetter = {
  char: '*',
  count: 2,
  points: 0,
};

export const ALL_LETTERS = [
  {
    char: 'E',
    count: 12,
    points: 1,
  },
  {
    char: 'A',
    count: 9,
    points: 1,
  },
  {
    char: 'I',
    count: 9,
    points: 1,
  },
  {
    char: 'O',
    count: 8,
    points: 1,
  },
  {
    char: 'N',
    count: 6,
    points: 1,
  },
  {
    char: 'R',
    count: 6,
    points: 1,
  },
  {
    char: 'T',
    count: 6,
    points: 1,
  },
  {
    char: 'L',
    count: 4,
    points: 1,
  },
  {
    char: 'S',
    count: 4,
    points: 1,
  },
  {
    char: 'U',
    count: 4,
    points: 1,
  },
  {
    char: 'D',
    count: 4,
    points: 2,
  },
  {
    char: 'G',
    count: 3,
    points: 2,
  },
  {
    char: 'B',
    count: 2,
    points: 3,
  },
  {
    char: 'C',
    count: 2,
    points: 3,
  },
  {
    char: 'M',
    count: 2,
    points: 3,
  },
  {
    char: 'P',
    count: 2,
    points: 3,
  },
  {
    char: 'F',
    count: 2,
    points: 4,
  },
  {
    char: 'H',
    count: 2,
    points: 4,
  },
  {
    char: 'V',
    count: 2,
    points: 4,
  },
  {
    char: 'W',
    count: 2,
    points: 4,
  },
  {
    char: 'Y',
    count: 2,
    points: 4,
  },
  {
    char: 'K',
    count: 1,
    points: 5,
  },
  {
    char: 'J',
    count: 1,
    points: 8,
  },
  {
    char: 'X',
    count: 1,
    points: 8,
  },
  {
    char: 'Q',
    count: 1,
    points: 10,
  },
  {
    char: 'Z',
    count: 1,
    points: 10,
  },
  WILDCARD,
];
