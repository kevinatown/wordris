import styled, { css, keyframes } from 'styled-components';
import { COLORS, GRAYS, FONT_COLORS  } from '../styles';

export const Button = styled.button`
  font-size: 1em;
  padding: 10px 1px;
  margin: 0;
  width: 80%;
  background-color: ${ COLORS.BLUE };
  color: ${ FONT_COLORS.LIGHT };
  border-radius: 8px;
  margin: 0 auto;
  @media (hover: hover) {
    &:hover {
      box-shadow: rgb(30, 30, 30) 0px 0px 4px 1px;
    }
  }

  @media screen and (min-width: 700px) {
    padding: 10px 5px;
    font-size: inherit;
  }
`;
