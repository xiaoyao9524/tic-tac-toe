import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function checkWinner (squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    if (squares[lines[i][0]] === squares[lines[i][1]] && squares[lines[i][0]] === squares[lines[i][2]]) {
      return squares[lines[i][0]] ? squares[lines[i][0]] : null;
    }
  }
  return null;
}

// 方块
/*
class Square extends React.Component {
  constructor () {
    super();
    this.state = {
      value: null
    };
  }
  render() {

    return (
        <button className="square" onClick={() => {console.log(this.props);this.props.onClick()}}>
          {this.props.value}
        </button>
    );
  }
}
*/
function Square (props) {
  return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
  )
}

// 版
class Board extends React.Component {
  renderSquare (i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => {
          this.props.onClick(i)
        }}
      />
    );
  }

  render() {
    return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
    );
  }
}

class Game extends React.Component {
  constructor () {
    super();
    this.state = {
      currentIndex: 0,
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      xIsNext: true
    }
  }

  handleClick (i) {
    const history = this.state.history.slice(0, this.state.currentIndex + 1);
    const current = history[this.state.currentIndex];
    const squares = current.squares.slice();

    if (checkWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      currentIndex: history.length,
      history: history.concat([{squares}]),
      xIsNext: !this.state.xIsNext
    })
  }

  jumpTo(index) {
    this.setState({
      currentIndex: index,
      xIsNext: !(index % 2)
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.currentIndex];
    const squares = current.squares;
    const winner = checkWinner(squares);

    const moves = history.map((item, index) => {
      const title = index ?
        'move #' + index :
        'Game Start';

      return (
        <li key={index}>
          <button onClick={() => this.jumpTo(index)}>{title}</button>
        </li>
      );
    });
/*
    const moves = history.map((step, index) => {
      const desc = index ?
          'Move #' + index :
          'Game start';
      return (
          <li key={index}>
            <button onClick={() => this.jumpTo(index)}>{desc}</button>
          </li>
      );
    });
*/
    let status = '';
    if (winner) {
      status = 'Winner: ' + winner + '!!!';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => {
                this.handleClick(i)
              }}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
    );
  }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
