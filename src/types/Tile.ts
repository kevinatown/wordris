import { ILetter } from './Letter';

export enum TileState {
  EMPTY,
  FILLED,
}

export interface ITile {
  state: TileState;
  value?: ILetter;
}

export const EMPTY_TILE: ITile = {
  state: TileState.EMPTY,
};
