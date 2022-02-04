import IMatch from '../../types/Match';

export default interface IScoreService {
  totalPoints: number;
  level: number;
  wordsScored: IWord[];
  tickInterval: number;
  scoreMatch(match: IMatch): {
    scoredWord: IWord,
    newLevel: boolean,
  };
}

export interface IWord {
  matchValue: string;
  points: number;
}
