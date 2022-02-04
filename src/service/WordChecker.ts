import sowpods from 'pf-sowpods';
import IWordChecker from './interfaces/IWordChecker';
import { ITileMoved } from './interfaces/ICollapser';
import {
  WILDCARD,
  ALL_LETTERS,
  IBoard,
  IMatch,
  TileState,
  ITile,
} from '../types';
import { PIECE_SIZE } from '../config';

class WordChecker implements IWordChecker {

  private minMatchLength: number;
  private boardWidth: number;
  private boardHeight: number;

  constructor(minMatchLength: number, boardWidth: number, boardHeight: number) {
    this.minMatchLength = minMatchLength;
    this.boardHeight = boardHeight;
    this.boardWidth = boardWidth;
  }

  public findMultiMatches(board: IBoard, tilesMoved: ITileMoved[]): IMatch[] {
    const matches: IMatch[] = [];
    tilesMoved.forEach(activePiece => {
      this.findRowMatches({
        tiles: board.tiles,
        activePiece,
      }).forEach(match => matches.push(match));

      this.findColMatches({
        tiles: board.tiles,
        activePiece,
      }).forEach(match => matches.push(match));
    });
    return  matches;
  }

  public findMatches(board: IBoard): IMatch[] {
    const matches: IMatch[] = [];

    if (!board.activePiece) {
      return matches;
    }

    this.findRowMatches(board).forEach(match => matches.push(match));
    this.findColMatches(board).forEach(match => matches.push(match));

    return matches.sort((a: IMatch, b: IMatch) => b.points - a.points);
  }

  private findColMatches({ activePiece, tiles }): IMatch[] {
    const { colIndex, rowIndex } = activePiece.coord;
    const matches: IMatch[] = [];
    const wcMatches: IMatch[] = [];
    const endPostion = rowIndex + this.minMatchLength - 1;
    const tileGetter = i => tiles[colIndex][i];

    //
    // Start at the bottom and work up to it's self
    //
    for (let rowIdxCheck = this.boardHeight - 1; rowIdxCheck >= endPostion; rowIdxCheck--) {

      const checking = tileGetter(rowIdxCheck);
      if (checking.state === TileState.EMPTY) {
        continue;
      }

      const tilesInfo = this.buildTilesInfo(tileGetter, rowIndex, rowIdxCheck);
      const wildcardIndex = tilesInfo.value.indexOf('*');
      if (sowpods.verify(tilesInfo.value) && tilesInfo.value.length >= this.minMatchLength) {
        matches.push({
          actualVal: tilesInfo.value,
          matchVal: tilesInfo.value,
          points: tilesInfo.points,
          startRowPos: rowIndex,
          startColPos: colIndex,
          isHorizontal: false,
        });
        // break out of loop cause this word contains smaller words
        break;
      } else if (wildcardIndex >= 0) {
        const wcMatch = this.findWildCards(tilesInfo.value)
          .map(f => this.buildWildCardTileInfo(f, wildcardIndex))
          .sort((ma, mb) => ma.points < mb.points || ma.value.length < mb.value.length)[0];

        if (!!wcMatch && wcMatch.actualVal.length >= this.minMatchLength) {
          matches.push({
            actualVal: wcMatch.actualVal,
            matchVal: wcMatch.value,
            points: wcMatch.points,
            startRowPos: rowIndex,
            startColPos: colIndex,
            isHorizontal: false,
          });
          break;
        }
      }
    }
    return matches
            .sort((ma, mb) => ma.points < mb.points || ma.matchVal.length < mb.matchVal.length)
            .filter((m, i) => this.keepMatch(matches, m, i, rowIndex));
  }

  private findRowMatches({ activePiece, tiles }): IMatch[] {
    const { colIndex, rowIndex } = activePiece.coord;
    const matches: IMatch[] = [];
    const tileGetter = i => tiles[i][rowIndex];
    let lastValidIdx = this.boardWidth - 1;

    for (let colIdxCheck = 0; colIdxCheck < this.boardWidth; colIdxCheck++) {
      const checking = tileGetter(colIdxCheck);
      //
      // if it's empty here we can stop looking as we already passed the activePiece and can leave
      //
      if (colIdxCheck > colIndex && checking.state === TileState.EMPTY) {
        break;
      }

      //
      // if it's empty here we can go to the next as theres not tiles to the activePiece
      //
      if (checking.state === TileState.EMPTY) {
        continue;
      }

      for (let endIdx = lastValidIdx; endIdx > colIdxCheck; endIdx--) {

        const checkingTile = tileGetter(endIdx);
        const isCheckingTileEmpty = checkingTile.state === TileState.EMPTY;

        // we dont want to keep checking on EMPTY tiles
        if (isCheckingTileEmpty && endIdx > colIndex) {
          lastValidIdx = endIdx;
          continue;
        }

        // dont need to continue as the fallen tile is not included
        if (isCheckingTileEmpty && endIdx < colIndex) {
          break;
        }

        const tilesInfo = this.buildTilesInfo(tileGetter, colIdxCheck, endIdx);
        const wildcardIndex = tilesInfo.value.indexOf('*');
        if (sowpods.verify(tilesInfo.value) && tilesInfo.value.length >= this.minMatchLength) {
          matches.push({
            actualVal: tilesInfo.value,
            matchVal: tilesInfo.value,
            points: tilesInfo.points,
            startRowPos: rowIndex,
            startColPos: colIdxCheck,
            isHorizontal: true,
          });
          break;
        } else if (wildcardIndex >= 0) {
          const wcMatch = this.findWildCards(tilesInfo.value)
            .map(f => this.buildWildCardTileInfo(f, wildcardIndex))
            .sort((ma, mb) => ma.points < mb.points || ma.value.length < mb.value.length)[0];

          if (!!wcMatch && wcMatch.actualVal.length >= this.minMatchLength) {
            matches.push({
              actualVal: wcMatch.actualVal,
              matchVal: wcMatch.value,
              points: wcMatch.points,
              startRowPos: rowIndex,
              startColPos: colIdxCheck,
              isHorizontal: true,
            });
            break;
          }
        }
      }
    }

    return matches
      .sort((ma, mb) => ma.points < mb.points || ma.matchVal.length < mb.matchVal.length)
      .filter((m, i) => this.keepMatch(matches, m, i, colIndex));
  }

  private findWildCards(str: string): string[] {
    const strSplit = str.split('*');
    const idxOfSplit = str.indexOf('*');

    if (strSplit.length > 2 || strSplit.length < 2) {
      return [];
    }
    return sowpods.filter(w => {
      const wSplit = w.substring(idxOfSplit, 0);
      const wEndSplit = w.substring(idxOfSplit + 1);
      return w.length === str.length &&
        wSplit === strSplit[0]  &&
        wEndSplit === strSplit[1];
    });
  }

  private keepMatch(matches: IMatch[], testMatch: IMatch, idx: number, activeIdx: number): boolean {
    const testMatchArr = [ ...matches ];
    testMatchArr.splice(idx, 1);

    const isIncluded = testMatchArr.find(m => {

      const testEndPos = testMatch.actualVal.length + testMatch.startColPos - 1;
      const mEndPos = m.actualVal.length + m.startColPos - 1;

      // checks if the activeIdx is used as end or beginning (see test: Finds multiple overlapping matches correctly)
      const activeIdxMatters = activeIdx === testEndPos || activeIdx === testMatch.startColPos;

      // covers items that begins and ends at different places (see test: Filters out semi substrings, C-A-B-O-U-T)
      const isWithin = !activeIdxMatters &&
                        ((m.startColPos <= testMatch.startColPos && mEndPos < testEndPos) ||
                        (testMatch.startColPos <= m.startColPos && testEndPos < mEndPos));

      return m.actualVal.includes(testMatch.actualVal) || isWithin;
    });

    if (!!isIncluded) {
      return false;
    }
    return true;
  }

  private buildTilesInfo(tileGetter: (i: number) => ITile, startIdx: number, stopIdx: number): ITileInfo {

    let value = '';
    let points = 0;

    for (let i = startIdx; i <= stopIdx; i++) {

      const letter = tileGetter(i).value;

      if (!letter) {

        return {
          actualVal: value,
          value,
          points,
        };
      }

      points += letter.points;
      value += letter.char;
    }

    return {
      actualVal: value,
      value,
      points,
    };
  }

  private buildWildCardTileInfo(str: string, ignoreIdx: number): ITileInfo {
    const strArr = str.split('');
    let value = '';
    let actualVal = '';
    let points = 0;
    strArr.forEach((char, idx) => {
      const letter = ALL_LETTERS.find(l => l.char === char);
      points += idx === ignoreIdx ? 0 : letter.points;
      actualVal += idx === ignoreIdx ? '*' : letter.char;
      value += letter.char;
    });
    return {
      value,
      points,
      actualVal,
    };
  }
}

interface ITileInfo {
  value: string;
  actualVal: string;
  points: number;
}

export default WordChecker;
