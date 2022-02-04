import IScoreService, { IWord } from './interfaces/IScoreService';
import { IMatch } from '../types';

interface ILevelToDecreaseAmt {
  [key: number]: number;
}

const LEVEL_TO_DECREASE_AMT: ILevelToDecreaseAmt = {
  9: 20,
  10: 20,
  16: 20,
  19: 20,
  13: 10,
  29: 10,
};

class ScoreService implements IScoreService {

  private totalScore: number;
  private currentLevel: number;
  private scoredWords: IMatch[];
  private wordPerLevelThreshold: number;
  private currentInterval: number;

  constructor(wordPerLevelThreshold: number, startingLevel: number) {
    this.totalScore = 0;
    this.currentLevel = startingLevel + 1;
    this.currentInterval = this.getIntialInterval();
    this.wordPerLevelThreshold = wordPerLevelThreshold;
    this.scoredWords = [];
  }

  public scoreMatch(match: IMatch): { scoredWord: IMatch, newLevel: boolean } {

    let newLevel = false;

    this.scoredWords.push(match);
    this.totalScore = this.totalScore + match.points * this.currentLevel;

    if (this.shouldUpdateLevel) {
      this.currentLevel = this.currentLevel + 1;
      this.currentInterval = this.currentInterval - this.getIntervalDecreaseAmtMs(this.level);
      newLevel = true;
    }

    return {
      scoredWord: match,
      newLevel,
    };
  }

  private getWordsLeftInThisLevel() {
    const upperBound = this.currentLevel * this.wordPerLevelThreshold;
    return upperBound - this.wordsScored.length;
  }

  private getIntialInterval(): number {
    let interval: number = 800;
    let trackLvl: number = 0;

    while (trackLvl <= this.level) {
      interval = interval - this.getIntervalDecreaseAmtMs(trackLvl);
      trackLvl++;
    }
    return interval;
  }

  private getIntervalDecreaseAmtMs(lvl: number): number {
    if (lvl <= 8 && lvl > 0) {
      return 85;
    }
    if (LEVEL_TO_DECREASE_AMT[lvl]) {
      return LEVEL_TO_DECREASE_AMT[lvl];
    }
    return 0;
  }

  private get shouldUpdateLevel() {
    return this.getWordsLeftInThisLevel() <= 0;
  }

  get totalPoints() {
    return this.totalScore;
  }

  get level() {
    return this.currentLevel - 1;
  }

  get wordsScored() {
    return this.scoredWords;
  }

  get tickInterval() {
    return this.currentInterval;
  }
}

export default ScoreService;
