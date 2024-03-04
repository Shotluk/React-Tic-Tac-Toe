   
import { useState } from 'react';
import './App.css';

function Square({ value, onSquareClick, isWinningSquare }) {
  return (
    <button className={`square ${isWinningSquare ? 'winner' : ''}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; ++i) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return [squares[a], lines[i]];
  }

  return null;
}

function Board() {
  const [xIsNext, setxIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo[0] : null;
  const winningLine = winnerInfo ? winnerInfo[1] : null;

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (xIsNext ? "x" : "o");
  }

  function handleClick(i) {
    const nextSquares = squares.slice();

    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    if (xIsNext) {
      nextSquares[i] = 'x';
    } else {
      nextSquares[i] = 'o';
    }

    setSquares(nextSquares);
    setxIsNext(!xIsNext);
  }

  return (
    <div className='game-board'>
      <div className='status'>{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} isWinningSquare={winningLine && winningLine.includes(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} isWinningSquare={winningLine && winningLine.includes(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} isWinningSquare={winningLine && winningLine.includes(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} isWinningSquare={winningLine && winningLine.includes(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} isWinningSquare={winningLine && winningLine.includes(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} isWinningSquare={winningLine && winningLine.includes(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} isWinningSquare={winningLine && winningLine.includes(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} isWinningSquare={winningLine && winningLine.includes(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} isWinningSquare={winningLine && winningLine.includes(8)} />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <div className="game-container">
        <Board />
      </div>
    </div>
  );
}

export default App;
