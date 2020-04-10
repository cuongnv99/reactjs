import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
  );
}

class Board extends React.Component {
  renderSquare(lol) {
    return (
        <Square
            value={this.props.squares[lol]}
            onClick={() => this.props.onClick(lol)}
        />
     );
  }

render() {
    return (
        <div>
          <div className="img">
            <img src="https://atpmedia.vn/wp-content/uploads/2019/12/C%C3%A1ch-s%E1%BB%AD-d%E1%BB%A5ng-th%E1%BA%BB-IMG.jpg" alt="Smiley face" height="100px" width="100px"/>
          </div>
          <div className="board-row" >
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

class Game extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNum: 0,
      nextClick: true
    };
  }

  jumpTo(step) {
    this.setState
    ({
      stepNum: step,
      nextClick: (step % 2) === 0,
    });
  }

  handleClick(lol) {
    const history = this.state.history.slice(0, this.state.stepNum + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (win(squares) || squares[lol]) {
      return;
    }
    squares[lol] = this.state.nextClick ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNum: history.length,
      nextClick: !this.state.nextClick,
   });
}

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNum];
    const winner = win(current.squares);

    const moves = history.map((step, move) => {

      const desc = move ? 'go to move # ' + move : 'goto move start ';
      return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}> {desc}</button>
          </li>
      )
    });

    let status;
    if (winner) {
      status = 'người thắng là : ' + winner;
    } else {
      status = 'Next turn  : ' + (this.state.nextClick ? 'X' : 'O');
    }
    return (
        <div className="game">
          <div className="game-board">
            <Board
                squares={current.squares}
                onClick={(lol) => this.handleClick(lol)}
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

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);

function win(squares) {
  const lines = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}