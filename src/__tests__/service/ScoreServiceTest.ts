import ScoreService from "../../service/ScoreService";

describe('Score Service', () => {

    const testData = [
        {
            matchVal: 'Hello',
            points: 10,
            startRowPos: 0,
            startColPos: 0,
            isHorizontal: true
        },
        {
            matchVal: 'World',
            points: 5,
            startRowPos: 0,
            startColPos: 0,
            isHorizontal: true
        },
        {
            matchVal: 'Richard',
            points: 7,
            startRowPos: 0,
            startColPos: 0,
            isHorizontal: true
        },
        {
            matchVal: 'Kevin',
            points: 4,
            startColPos: 0,
            startRowPos: 0,
            isHorizontal: false
        }
    ];

    it('should score a match correctly', () => {

      const wordPerLevelThreshold = 2;
      const level = 0;

      const scoreService = new ScoreService(wordPerLevelThreshold, level);

      expect(scoreService.tickInterval).toBe(800);
      expect(scoreService.level).toBe(0);
      expect(scoreService.totalPoints).toBe(0);
      expect(scoreService.wordsScored).toEqual([]);

      let result = scoreService.scoreMatch(testData[0]);

      expect(result.newLevel).toBe(false);
      expect(result.scoredWord).toEqual({
          matchVal: 'Hello',
          points: 10,
          startRowPos: 0,
          startColPos: 0,
          isHorizontal: true
      });
      expect(scoreService.tickInterval).toBe(800);
      expect(scoreService.totalPoints).toBe(10);
      expect(scoreService.level).toBe(0);
      expect(scoreService.wordsScored).toEqual(testData.slice(0, 1));

      result = scoreService.scoreMatch(testData[1]);

      expect(result.newLevel).toBe(true);
      expect(result.scoredWord).toEqual({
          matchVal: 'World',
          points: 5,
          startRowPos: 0,
          startColPos: 0,
          isHorizontal: true
      });
      expect(scoreService.tickInterval).toBe(715);
      expect(scoreService.totalPoints).toBe(15);
      expect(scoreService.level).toBe(1);
      expect(scoreService.wordsScored).toEqual(testData.slice(0, 2));

      result = scoreService.scoreMatch(testData[2]);

      expect(result.newLevel).toBe(false);
      expect(result.scoredWord).toEqual({
          matchVal: 'Richard',
          points: 7,
          startRowPos: 0,
          startColPos: 0,
          isHorizontal: true
      });
      expect(scoreService.tickInterval).toBe(715);
      expect(scoreService.totalPoints).toBe(29);
      expect(scoreService.level).toBe(1);
      expect(scoreService.wordsScored).toEqual(testData.slice(0, 3));


      result = scoreService.scoreMatch(testData[3]);

      expect(result.newLevel).toBe(true);
      expect(result.scoredWord).toEqual({
          matchVal: 'Kevin',
          points: 4,
          startColPos: 0,
          startRowPos: 0,
          isHorizontal: false
      });
      expect(scoreService.tickInterval).toBe(630);
      expect(scoreService.totalPoints).toBe(37);
      expect(scoreService.level).toBe(2);
      expect(scoreService.wordsScored).toEqual(testData.slice(0, 4));

    });

    it('getIntialInterval set correctly 8', () => {
      const wordPerLevelThreshold = 2;
      const level = 8;

      const scoreService = new ScoreService(wordPerLevelThreshold, level);
      expect(scoreService.level).toBe(8);
      expect(scoreService.tickInterval).toBe(120);

    });

    it('getIntialInterval set correctly 9', () => {
      const wordPerLevelThreshold = 2;
      const level = 9;

      const scoreService = new ScoreService(wordPerLevelThreshold, level);
      expect(scoreService.level).toBe(9);
      expect(scoreService.tickInterval).toBe(100);
    });

    it('getIntialInterval set correctly 10, and increase', () => {
      const wordPerLevelThreshold = 2;
      const level = 10;
      const scoreService = new ScoreService(wordPerLevelThreshold, level);

      expect(scoreService.level).toBe(10);
      expect(scoreService.tickInterval).toBe(80);

      let result = scoreService.scoreMatch(testData[0]);

      expect(result.newLevel).toBe(false);
      expect(scoreService.tickInterval).toBe(80);
      expect(scoreService.totalPoints).toBe(110);
      expect(scoreService.level).toBe(10);
      expect(scoreService.wordsScored).toEqual(testData.slice(0, 1));

      result = scoreService.scoreMatch(testData[1]);
      expect(result.newLevel).toBe(false);

      const bound = level * wordPerLevelThreshold;
      for (var i = 2; i <= bound; i++) {
        scoreService.scoreMatch(testData[0]);
      }

      
      result = scoreService.scoreMatch(testData[1]);
      expect(result.newLevel).toBe(true);
      expect(scoreService.tickInterval).toBe(80);
      expect(scoreService.level).toBe(11);

      result = scoreService.scoreMatch(testData[2]);
      expect(result.newLevel).toBe(false);
      expect(scoreService.tickInterval).toBe(80);
      expect(scoreService.level).toBe(11);
    
      result = scoreService.scoreMatch(testData[3]);

      expect(result.newLevel).toBe(true);
      expect(scoreService.tickInterval).toBe(80);
      expect(scoreService.level).toBe(12);

      result = scoreService.scoreMatch(testData[3]);

      expect(result.newLevel).toBe(false);
      expect(scoreService.tickInterval).toBe(80);
      expect(scoreService.level).toBe(12);

      result = scoreService.scoreMatch(testData[3]);

      expect(result.newLevel).toBe(true);
      expect(scoreService.tickInterval).toBe(70);
      expect(scoreService.level).toBe(13);
     
      for (var i = 13 * wordPerLevelThreshold; i < 18 * wordPerLevelThreshold; i++) {
        scoreService.scoreMatch(testData[0]);
      }

      result = scoreService.scoreMatch(testData[3]);

      expect(result.newLevel).toBe(false);
      expect(scoreService.tickInterval).toBe(50);
      expect(scoreService.level).toBe(18);

      result = scoreService.scoreMatch(testData[3]);

      expect(result.newLevel).toBe(true);
      expect(scoreService.tickInterval).toBe(30);
      expect(scoreService.level).toBe(19);

      for (var i = 19 * wordPerLevelThreshold; i < 28 * wordPerLevelThreshold; i++) {
        scoreService.scoreMatch(testData[0]);
      }

      result = scoreService.scoreMatch(testData[3]);

      expect(result.newLevel).toBe(false);
      expect(scoreService.tickInterval).toBe(30);
      expect(scoreService.level).toBe(28);
      

      result = scoreService.scoreMatch(testData[3]);

      expect(result.newLevel).toBe(true);
      expect(scoreService.tickInterval).toBe(20);
      expect(scoreService.level).toBe(29);
    });

     it('getIntialInterval set correctly 29', () => {
      const wordPerLevelThreshold = 2;
      const level = 29;

      const scoreService = new ScoreService(wordPerLevelThreshold, level);
      expect(scoreService.level).toBe(29);
      expect(scoreService.tickInterval).toBe(20);
    });

    it('getIntialInterval set correctly 30', () => {
      const wordPerLevelThreshold = 2;
      const level = 30;

      const scoreService = new ScoreService(wordPerLevelThreshold, level);
      expect(scoreService.level).toBe(30);
      expect(scoreService.tickInterval).toBe(20);
    });

     it('getIntialInterval set correctly 180', () => {
      const wordPerLevelThreshold = 2;
      const level = 180;

      const scoreService = new ScoreService(wordPerLevelThreshold, level);
      expect(scoreService.level).toBe(180);
      expect(scoreService.tickInterval).toBe(20);
    });

});