import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Board,
  Info,
  MovementButtons,
  Tile,
  MatchAnimator,
} from '../../components';
import * as constants from '../../common/constants';
import {
  createGameEngine,
  IGameConfig,
  GameEngine,
  IGameEngine,
  EMIT_MESSAGES,
} from '../../service';
import { Movement, IBoard, IMatch } from '../../types';
import { COLORS } from '../../common/styles';
import { Button } from '../../common/styled';
import { TileState } from '../../types/Tile';

interface IProps {
  config: IGameConfig;
}

interface IState {
  board: IBoard;
  isPaused: boolean;
  // matches: IMatch[];
  gameOver: boolean;
  engine: IGameEngine;
}

const GameWrapper = styled.div`
  display: flex;
  flex-flow: row-reverse wrap;
  height: calc(100vh - 20px);
  width: calc(100vw - 20px);
  background-color: ${COLORS.LIGHT_TAN};
`;

const BoardWrapper = styled.div`
  height: calc(100vh - 200px);
  padding: 20px 0;
  flex-grow: 2;
  @media screen and (min-width: 700px) {
    padding: 20px 0;
    height: calc(100vh - 60px);
  }
`;

const InfoWrapper = styled.div`
  padding: 20px;
  flex-grow: 1;
  max-width: 30%;
  font-size: 0.5em;
  height: calc(100vh - 60px);
  display: none;

  @media screen and (min-width: 700px) {
    max-width: 20%;
    font-size: inherit;
    max-width: inherit;
    display: block;
  }
`;

const MobileInfoWrapper = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 25px;
  display: flex;
  @media screen and (min-width: 700px) {
    display: none;
  }
`;

const NextWrapper = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-items: center;
`;

const InfoP = styled.p`
  margin: 10px 10px 5px;
`;

// TODO: move
const PauseOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  z-index: ${props => props.isActive ? 2 : -1};
  background-color: rgba(80, 10, 14, 0.8);
`;

const PauseOverlayContent = styled.div`
  margin: 10px auto;
  width: 80vw;
  background-color: ${COLORS.LIGHT_TAN};
  height: calc(100vh - 20px);
  @media screen and (min-width: 700px) {
    width: 60vw;
  }
`;

class Game extends Component<IProps, IState>  {

  static propTypes = {
    config: PropTypes.object,
  };

  constructor(props: IProps) {
    super(props);
    this.pauseGame = this.pauseGame.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    const engine = createGameEngine(props.config, this.handleMessage);
    this.state = {
      board: engine.board,
      isPaused: engine.isPaused,
      gameOver: engine.isGameOver,
      engine,
    };
    this.newGame = this.newGame.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  newGame() {
    const engine = createGameEngine(this.props.config, this.handleMessage);

    this.setState({
      engine,
      board: engine.board,
      isPaused: engine.isPaused,
      gameOver: engine.isGameOver,
    });
  }

  handleMessage({ message, data }: { message: EMIT_MESSAGES, data?: any }) {
    switch (message) {
      case EMIT_MESSAGES.BOARD_CHANGED:
        this.setState({ board: data.board });
        break;
      case EMIT_MESSAGES.GAME_PAUSED:
        this.setState({ isPaused: true });
        break;
      case EMIT_MESSAGES.GAME_STARTED:
        this.setState({ isPaused: false });
        break;
      case EMIT_MESSAGES.GAME_OVER:
        this.setState({ gameOver: true });
        break;
      case EMIT_MESSAGES.MATCH_SCORED:
        break;
      default:
        // code...
        break;
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        this.state.engine.handleMovement(Movement.LEFT);
        break;

      case 'ArrowRight':
        this.state.engine.handleMovement(Movement.RIGHT);
        break;

      case 'ArrowDown':
        this.state.engine.handleMovement(Movement.DOWN);
        break;

      case ' ':
        this.state.engine.handleMovement(Movement.ALL_DOWN);
        break;

      default:
        break;
    }
  }

  pauseGame() {
    this.state.engine.toggleGameState();
  }

  handleButtonPress(movment: Movement) {
    this.state.engine.handleMovement(movment);
  }

  renderMatches() {
    return this.state.engine.scoredWords.map((w, i) =>
        <MatchAnimator match={w} key={`${w.matchValue}_${i}`} />);
  }

  render() {
    const tile = { value: this.state.engine.nextPieces[0].letters[0], state: TileState.FILLED };
    return (
      <GameWrapper>
        <PauseOverlay isActive={this.state.isPaused || this.state.gameOver}>
          <PauseOverlayContent>
            <Info
              gameOver={this.state.gameOver}
              isPaused={this.state.isPaused}
              pauseGame={this.pauseGame}
              newGame={this.newGame}
              points={this.state.engine.points}
              nextPiece={this.state.engine.nextPieces}
              scoredWords={this.state.engine.scoredWords}
              level={this.state.engine.level}
              handleButtonPress={this.handleButtonPress}
            />
          </PauseOverlayContent>
        </PauseOverlay>
        <MobileInfoWrapper>
          <NextWrapper>
            <InfoP>
              Next:
            </InfoP>
            <Tile
              tile={tile}
              tileSize={36}
              isWidth={false}
            />
          </NextWrapper>
          <Button onClick={this.pauseGame}>
            { this.state.isPaused ? 'Resume' : 'Pause' }
          </Button>
        </MobileInfoWrapper>

        <InfoWrapper>
          <Info
            gameOver={this.state.gameOver}
            isPaused={this.state.isPaused}
            pauseGame={this.pauseGame}
            newGame={this.newGame}
            points={this.state.engine.points}
            nextPiece={this.state.engine.nextPieces}
            scoredWords={this.state.engine.scoredWords}
            level={this.state.engine.level}
            handleButtonPress={this.handleButtonPress}
            isSidebar
          />
        </InfoWrapper>
        <BoardWrapper>
          <Board
            board={this.state.board}
            getTile={this.state.engine.getTile}
          />
        </BoardWrapper>
        <MovementButtons handleButtonPress={this.handleButtonPress} />
        { this.renderMatches() }
      </GameWrapper>
    );
  }
}

export default Game;
