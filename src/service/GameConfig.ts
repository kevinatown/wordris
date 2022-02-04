export default interface IGameConfig {
  boardHeight: number;
  boardWidth: number;
  pieceSize: number;
  startingColIndexForNewPiece: number;
  minMatchLength: number;
  level: number;
  bagHydrationAmt: number;
  bagThreshold: number;
  wordPerLevelThreshold: number;
  piecesToPreview: number;
}

export class GameConfigBuilder {
  private _boardHeight = 22;
  private _boardWidth = 10;
  private _pieceSize = 1;
  private _startingColIndexForNewPiece = 4;
  private _minMatchLength = 3;
  private _level = 0;
  private _bagHydrationAmt = 10;
  private _bagThreshold = 3;
  private _wordPerLevelThreshold = 10;
  private _piecesToPreview = 10;

  public build(): IGameConfig {
    return {
      boardHeight: this._boardHeight,
      boardWidth: this._boardWidth,
      pieceSize: this._pieceSize,
      startingColIndexForNewPiece: this._startingColIndexForNewPiece,
      minMatchLength: this._minMatchLength,
      level: this._level,
      bagHydrationAmt: this._bagHydrationAmt,
      bagThreshold: this._bagThreshold,
      wordPerLevelThreshold: this._wordPerLevelThreshold,
      piecesToPreview: this._piecesToPreview,
    };
  }

  set boardHeight(val: number) {
    this._boardHeight = val;
  }

  set boardWidth(val: number) {
    this._boardWidth = val;
  }

  set pieceSize(val: number) {
    this._pieceSize = val;
  }

  set startingColIndexForNewPiece(val: number) {
    this._startingColIndexForNewPiece = val;
  }

  set minMatchLength(val: number) {
    this._minMatchLength = val;
  }

  set level(val: number) {
    this._level = val;
  }

  set bagHydrationAmt(val: number) {
    this._bagHydrationAmt = val;
  }

  set bagThreshold(val: number) {
    this._bagThreshold = val;
  }

  set wordPerLevelThreshold(val: number) {
    this._wordPerLevelThreshold = val;
  }

  set piecesToPreview(val: number) {
    this._piecesToPreview = val;
  }

}
