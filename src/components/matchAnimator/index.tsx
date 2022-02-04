import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import {
  ITile,
  TileState,
  IMatch,
} from '../../types';
import { COLORS, GRAYS, FONT_COLORS  } from '../../common/styles';

const sharedAnimations = `
  position: fixed !important;
  background-color: ${COLORS.TAN};
  background-color: ${COLORS.TAN};
  border: solid ${COLORS.TAN} 1px;
  box-shadow: 0 0 4px 1px ${GRAYS.A};
  z-index: 2;
`;

//
// TOD0: fix the animation
//
const move = ({ top, left }) => keyframes`
  0% {
    padding: 2px 2px;
    ${sharedAnimations}
    top: ${top};
    left: ${left};
    transform: scale(1);
    padding: 2px 2px;
    opacity: 1;
    z-index: 5;
  }

  50% {
    ${sharedAnimations}
    transform: scale(2);
    padding: 4px 4px;
    z-index: 5;
  }

  90% {
    ${sharedAnimations}
    transform: scale(1);
    top: 20vh;
    left: 80vw;
    padding: 2px 2px;
    width: auto;
    z-index: 5;
  }

  100% {
    display: none !important;
    opacity: 0;
    z-index: -1;
    visibility: hidden;
    width: 0;
  }
`;

//
// TODO: CLEAN THIS UP AND DO A TIMER FOR DISPLAY: NONE
//

const MatchWrapper = styled.div`
  animation: ${props => move(props)} 800ms linear;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  position: fixed !important;
`;

interface IAnchor {
  top: string;
  left: string;
}

const MatchAnimator = ({ match }: { match: IMatch }) => {
  const {
    matchVal,
    points,
    startRowPos,
    startColPos,
    isHorizontal,
  } = match;
  let top = '50%';
  let left = '50%';
  const ele = document.getElementById(`${startColPos}_x ${startRowPos}_y`);

  if (!!ele) {
    left = `${ele.offsetLeft}px`;
    top = `${ele.offsetTop}px`;
  }

  return (
    <div>
      <MatchWrapper left={left} top={top} isHorizontal={isHorizontal}>
        { matchVal } + { points }
      </MatchWrapper>
    </div>
  );
};

export default MatchAnimator;
