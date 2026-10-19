import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function calculateWinner(squares) {
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (const [a,b,c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
  }
  return null;
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }
  const winner = calculateWinner(squares);
  const status = winner ? `Winner: ${winner}` : squares.every(Boolean) ? "It's a draw!" : `Next player: ${xIsNext ? 'X' : 'O'}`;
  return <div><div className="status">{status}</div><div className="board">{squares.map((value, i) => <Square key={i} value={value} onSquareClick={() => handleClick(i)} />)}</div></div>;
}

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  function restart() { setHistory([Array(9).fill(null)]); setCurrentMove(0); }
  return <main className="container"><h1>Tic-Tac-Toe</h1><div className="game"><div><Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/><button className="restart" onClick={restart}>Restart Game</button></div><section className="history"><h2>Move History</h2><ol>{history.map((_, move) => <li key={move}><button className={move === currentMove ? 'active' : ''} onClick={() => setCurrentMove(move)}>{move ? `Go to move #${move}` : 'Go to game start'}</button></li>)}</ol></section></div></main>;
}
