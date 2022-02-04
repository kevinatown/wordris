import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { ITile, TileState } from '../../types';
import { COLORS, GRAYS, FONT_COLORS  } from '../../common/styles';

//
// TODO: fix animations
//

const getTextSize = ({ isisWidth, responsive }) => {
  if (!responsive) {
    return '14px';
  }
  return isWidth ? '2vw' : '2vh';
};

const slideDown = tileSize => keyframes`
  from {
    top: 0;
  }

  to {
    top: 0;
  }
`;

const TileWrapper = styled.div`
  border: solid ${GRAYS.D} 1px;
  margin: ${props => props.responsive ? '2px 2px' : '10px auto 0 auto'};
  height: ${props => props.tileSize}px;
  width: ${props => props.tileSize}px;
  line-height: ${props => props.tileSize}px;
  animation: ${props => slideDown(props.tileSize)} 1s ease-out forwards;
  position: relative;

  ${props => props.isFilled && css`
    background-color: ${COLORS.TAN};
    border: solid ${COLORS.TAN} 1px;
    box-shadow: 0 0 ${props.isActive ? `9px 3px ${COLORS.BLUE}` : `4px 1px ${GRAYS.A}`};
  `}
`;

const LetterWrapper = styled.p`
  text-align: center;
  margin: 0;
  font-size: ${props => getTextSize(props)};
`;

const PointsWrapper = styled.p`
  position: absolute;
  bottom: 0;
  right: 0;
  line-height: normal;
  margin: 0;
  font-size: ${ props => props.tileSize > 17 ? '0.5em' : '0' };
`;

export interface ITileOptions {
  height: number;
  width: number;
  rowLength: number;
  colLength: number;
}

const Tile = ({ tile, tileSize, isWidth, responsive, isActive, location }:
  {
    tile: ITile,
    tileSize: number,
    isWidth: boolean,
    responsive: boolean,
    isActive: boolean,
    location: string,
  }) => {

  const isFilled = !!tile && tile.state === TileState.FILLED;
  return (
    <TileWrapper
      id={location}
      isFilled={isFilled}
      tileSize={tileSize}
      isWidth={isWidth}
      responsive={responsive}
      isActive={isActive}
    >
      <LetterWrapper>
        { isFilled ? tile.value.char : '' }
      </LetterWrapper>
      <PointsWrapper tileSize={tileSize}>
        { isFilled ? tile.value.points : '' }
      </PointsWrapper>
    </TileWrapper>
  );
};

export default Tile;
