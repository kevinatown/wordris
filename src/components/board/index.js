import React, { Component, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Tile } from '../';
import { TileState } from '../../types';

const BoardContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  felx: 1;
`;

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0
    }
    this.generateRow = this.generateRow.bind(this);
    this.generateBoard = this.generateBoard.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.updateDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    this.setState({
      height: this.refs.board.offsetHeight - 40,
      width: this.refs.board.offsetWidth - 40
    });
  }

  generateRow(ycount, colLen, tileSize, isWidth) {
    const table = [];
    for (let count = 0; count < colLen; count++) {
      const location = `${count}_x ${ycount}_y`;
      const tile = this.props.getTile(ycount, count);
      let isActive = false;
      if (!!this.props.board.activePiece) {
        const { coord } = this.props.board.activePiece;
        isActive = !!coord && (coord.colIndex === count && coord.rowIndex === ycount);
      }

      table.push(<Tile
        location={location}
        key={location}
        tile={tile}
        tileSize={tileSize}
        isWidth={isWidth}
        isActive={isActive}
        responsive />);
    }
    return table;
  }

  generateBoard() {
    // tetris boards are 10x22
    // http://tetris.wikia.com/wiki/Tetris_Guideline
    // new tiles begin at [0][4]
    const table = [];
    const { height, width } = this.state;
    const rowLength = this.props.board.tiles[0].length;
    const colLength = this.props.board.tiles.length;

    const rowSize = ((height - rowLength * 4) / rowLength);
    const colSize = ((width - colLength * 4) / colLength);
    const isWidth = rowSize < colSize;
    const tileSize = isWidth ? rowSize : colSize;
    
    for (let ycount = 0; ycount < rowLength; ycount++) {
      const key = `${ycount}_row`;
      table.push(<Row key={key} className={key}>{ this.generateRow(ycount, colLength, tileSize, isWidth) }</Row>);
    }
    return table;
  }

  render() {
    return (
      <BoardContainer ref="board">
        { this.generateBoard() }
      </BoardContainer>
    );
  }
}

Board.propTypes = {
  board: PropTypes.shape({
    tiles: PropTypes.array.isRequired,
    activePiece: PropTypes.object,
  }).isRequired,
  getTile: PropTypes.func.isRequired,
}

export default Board;
