import React, { useState } from 'react';
import Board from './board';
import calculateWinner from '../calculateWinner';

const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    
    const handleClick = (i) => {
        const pointInHistory = history.slice(0, stepNumber + 1);
        const current = pointInHistory[stepNumber];
        const squares = [...current];
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory([...pointInHistory, squares]);
        setStepNumber(pointInHistory.length);
        setXIsNext(!xIsNext);
       
    }

    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext((step % 2) === 0);
    }

    const renderMoves = () => 
        history.map((_step, move) => {
            const desc = move ? 'Go to move #' + move : 'Restart Game';
            return (
                <li>
                    <button key={move} onClick={() => jumpTo(move)}>{desc}</button>
                </li>
            );
        });
    

    const checkStatus = () => {
        const winner = calculateWinner(history[stepNumber]);
        return winner ? 'Winner: ' + winner : 'Next Move: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={history[stepNumber]}
              onClick={(i) => handleClick(i)} 
            />
          </div>
          <div className="game-info">
            <div>{checkStatus()}</div>
            <ol>{renderMoves()}</ol>
          </div>
        </div>
      );
}
export default Game;