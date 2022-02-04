import React, { useRef, useEffect, useCallback } from 'react';
import whatInput from 'what-input';
import { IWord, IUpcomingPiece } from '../../service';
import Tile from '../tile';
import MovementButtons from '../movementButtons';
import { TileState } from '../../types';
import * as Styled from './info.styled';
import { Button } from '../../common/styled';

const Info = ({
  isPaused,
  isSidebar = false,
  gameOver,
  pauseGame,
  newGame,
  points,
  scoredWords,
  level,
  nextPiece,
  handleButtonPress }: {
    isPaused: boolean,
    isSidebar?: boolean,
    gameOver: boolean,
    pauseGame: () => void,
    newGame: () => void,
    points: number,
    scoredWords: IWord[],
    level: number,
    nextPiece: IUpcomingPiece,
    handleButtonPress: (movement: Movement) => void,
  }) => {

  //
  // TODO: fix to build tiles
  //
  const tile = { value: nextPiece[0].letters[0], state: TileState.FILLED };
  const wordsCompleted = scoredWords.length;
  const wordList = useRef<HTMLDivElement>();
  const wordContainer = useRef<HTMLDivElement>();
  const isTouch = whatInput.ask() === 'touch';
  useEffect(() => {
    if (!!wordList.current) {
      wordList.current.scrollTop = wordList.current.scrollHeight;
    }
  });

  const renderWords = () => {
    return scoredWords.map((w, i) =>
        <Styled.InfoP key={`${w.matchValue}_${i}`}>
          { w.matchVal } + { w.points }
        </Styled.InfoP>);
  };

  return (
    <Styled.Wrapper>
      { gameOver &&
        (<Styled.GameoverContainer>
          <Styled.GameoverTitle>GAME OVER</Styled.GameoverTitle>
          <Button
            onClick={newGame}
          >
            Play Again?
          </Button>
        </Styled.GameoverContainer>)
      }
      <Styled.InfoContainer>
        <Styled.InfoP topOnly={true}>Score: {points}</Styled.InfoP>
        <Styled.InfoP topOnly={true}>Level: {level}</Styled.InfoP>
        <Styled.InfoP topOnly={true}>Words Completed: {wordsCompleted}</Styled.InfoP>
        <Styled.ScoredWordsContainer id="ScoredWordsList" ref={wordContainer}>
          <Styled.ScoredWordsTitle>
            Scored Words:
          </Styled.ScoredWordsTitle>
          <Styled.ScoredWordsList ref={wordList}>
            { renderWords() }
          </Styled.ScoredWordsList>
        </Styled.ScoredWordsContainer>
        <Styled.ContentContainer>
          <Styled.SectionTitle>
            Next:
          </Styled.SectionTitle>
          <Tile
            tile={tile}
            tileSize={36}
            isWidth={false}
          />
        </Styled.ContentContainer>
      </Styled.InfoContainer>
      <Styled.ButtonContainer>
        {
          !gameOver &&
            (<Button
              onClick={pauseGame}
            >
              { isPaused ? 'Resume' : 'Pause' }
            </Button>)
        }
        {
          isSidebar && isTouch && (
            <MovementButtons isSidebar={isSidebar} handleButtonPress={handleButtonPress} />
          )
        }
      </Styled.ButtonContainer>
    </Styled.Wrapper>
  );
};

export default Info;
