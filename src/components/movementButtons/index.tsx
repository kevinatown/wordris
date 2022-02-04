import React, { useRef, useEffect, useCallback } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Movement } from '../../types';
import useLongPress from './useLongPress';
import { Button } from '../../common/styled';

interface IExtendedDiv extends HTMLDivElement {
  isSidebar?: boolean;
}

export const ControlWrapper = styled.div<HTMLDivElement>`
  display: flex;
  width: 100%;
  ${
    ({isSidebar}) => !isSidebar && css`
        @media screen and (min-width: 700px) {
          display: none;
        }
    `
  }
`;

export const ControlButton = styled(Button)`
  padding: 20px 1px;
  margin: 0 10px 5px;
`;

const MovementButtons = ({
  isSidebar = false,
  handleButtonPress }: {
    isSidebar?: boolean;
    handleButtonPress: (movement: Movement) => void,
  }) => {

  const handleHoldsLeft = useLongPress(() => handleButtonPress(Movement.LEFT), 50);
  const handleHoldsDown = useLongPress(() => handleButtonPress(Movement.DOWN), 50);
  const handleHoldsRight = useLongPress(() => handleButtonPress(Movement.RIGHT), 50);

  return (
    <ControlWrapper isSidebar={isSidebar}>
      <ControlButton { ...handleHoldsLeft }>
        Left
      </ControlButton>
      <ControlButton { ...handleHoldsDown }>
        Down
      </ControlButton>
      <ControlButton { ...handleHoldsRight }>
        Right
      </ControlButton>
    </ControlWrapper>
  );
};

export default MovementButtons;
