import React, { Component } from 'react';
import styled from 'styled-components';
import Game from '../containers/game';
import { IGameConfig, GameConfigBuilder } from '../service';
import { COLORS } from '../common/styles';

interface IState {
  isGameStarted: boolean;
}

const AppWrapper = styled.div`
  background-color: ${COLORS.DARK_RED};
  height: calc(100vh - 20px);
  width: calc(100vw - 20px);
  padding: 10px;
`;

class App extends Component<any, IState> {
  private config: IGameConfig;

  constructor(props: any) {
    super(props);
    this.config = new GameConfigBuilder().build();
    this.state = {
      isGameStarted: false,
    };
  }

  public render() {
    return (
      <AppWrapper>
        <Game config={ this.config } />
      </AppWrapper>
    );
  }
}

export default App;
