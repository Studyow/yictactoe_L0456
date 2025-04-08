import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

let xxx = '';
let yyy = '';





function Board({ xIsNext, squares, onPlay }) {

    const [set1, setP1] = useState('')
    const [set2, setP2] = useState('')


    xxx = set1;
    yyy = set2;
    
  function handleClick(i) {


    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }




  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Your Turn: ' + (xIsNext ? xxx : yyy);
  }

  return (
    <>
    <div>
        <div>
            <h4>Enter Name</h4>
        </div>

        <div className='EntName'>
            <div>
                <label htmlFor="">X</label>
                <input className='name01' type="text" placeholder='Player 1' onChange={(e) => setP1(e.target.value)} />
            </div>
            <div>
            <label htmlFor="">O</label>
                <input className='name02' type="text" placeholder='Player 2' onChange={(e) => setP2(e.target.value)}/>
            </div>
        </div>

      <div className="status">
        <h4>{status}</h4></div>

    </div>

      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const goner = 0;
  function jumpTo(nextMove,goner) {
    // console.log(nextMove)
    window.location.reload(true);
    setCurrentMove(nextMove);
  }

  
const IDXZ = 0;

  const moves = history.map((squares, move) => {
    let description;
    let turns;
    let idE = 0;
    if (move > 0) {
        idE = 1;
        turns = 'Go to move #' + move;
    } else {
        idE = 0;
      description = 'Start New Game';
    }
    return (
      <li key={move} >
        {idE === 1 ?
        <div className='Move-turn'>
            <button onClick={() => jumpTo(move,goner)}>{turns}</button>
        </div>
        :
        <div className='Move-description'>
            <button onClick={() => jumpTo(move,goner)}>{description}</button>
        </div>
        }
        </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
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
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

