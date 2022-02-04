import styled, { css, keyframes } from 'styled-components';
import { COLORS, GRAYS, FONT_COLORS  } from '../../common/styles';
import { Button } from '../../common/styled';

export const GameoverContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GameoverTitle = styled.h1`
  text-align: center;
  margin-bottom: 5px;
`;

export const Wrapper = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  padding: 5px;

  @media screen and (min-width: 700px) {
    padding: 10px;
  }
`;

export const InfoP = styled.p`
  color: ${ FONT_COLORS.DARK };
  padding: ${props => props.topOnly ? '5px 5px 0' : '5px'};
  margin: ${props => props.topOnly ? '5px 5px 0' : '5px'};
`;

export const SectionTitle = styled.h3`
  padding: 5px;
  margin: 0;
  text-align: center;
  border-bottom: solid ${ FONT_COLORS.DARK } 1.5px;
  top: 0;
  right: 0;
  left: 0;
`;

export const ContentContainer = styled.div`
  position: relative;
  margin-top: 20px;
  padding: 5px;
  border: solid ${ GRAYS.E } 1px;
  color: ${ FONT_COLORS.DARK };
  @media screen and (min-width: 700px) {
    padding: 10px;
  }
`;

export const ScoredWordsContainer = styled(ContentContainer)`
  background-color: ${ COLORS.GRAY };
  height: 25%;
  display: block;
  overflow: hidden;
`;

export const ScoredWordsList = styled.div`
  overflow-y: scroll;
  height: 90%;
`;

export const ScoredWordsTitle = styled(SectionTitle)`
  background-color: ${ COLORS.GRAY };
  postion: absolute;
`;

export const InfoContainer = styled.div`
  flex-grow: 1;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
