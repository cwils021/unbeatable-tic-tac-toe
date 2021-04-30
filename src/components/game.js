import React, { useState, useEffect } from "react";
import Board from "./board";
import calculateWinner from "../calculateWinner";

const Game = () => {
  const [gameState, setGameState] = useState({
    history: [Array(9).fill(null)],
    stepNumber: 0,
    xIsNext: true,
  });

  const handleClick = (i) => {
    if (gameState.xIsNext) {
      const pointInHistory = gameState.history.slice(
        0,
        gameState.stepNumber + 1
      );
      const current = pointInHistory[gameState.stepNumber];
      const squares = [...current];
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = "X";
      setGameState({
        history: [...pointInHistory, squares],
        stepNumber: pointInHistory.length,
        xIsNext: false,
      });
    }
  };

  useEffect(() => {
    if (!gameState.xIsNext && gameState.stepNumber < 9) {
      const pointInHistory = gameState.history.slice(
        0,
        gameState.stepNumber + 1
      );
      const current = pointInHistory[gameState.stepNumber];
      const squares = [...current];
      const oIdx = squares.findIndex((e) => e === null);

      if (calculateWinner(squares)) return;

      squares[oIdx] = "O";
      setGameState({
        history: [...pointInHistory, squares],
        stepNumber: pointInHistory.length,
        xIsNext: true,
      });
    }
  }, [gameState]);

  const jumpTo = (step) => {
    setGameState({
      history: step !== 0 ? gameState.history : [Array(9).fill(null)],
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  };

  const renderMoves = () =>
    gameState.history.map((_step, move) => {
      const desc = move ? "Go to move #" + move : "Clear Board";
      return (
        <li>
          <button key={move} onClick={() => jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

  const checkStatus = () => {
    if (gameState.stepNumber < 9) {
      const winner = calculateWinner(gameState.history[gameState.stepNumber]);
      return winner
        ? "Winner: " + winner
        : "Next Move: " + (gameState.xIsNext ? "X" : "O");
    }
    return "Draw!";
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={gameState.history[gameState.stepNumber]}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{checkStatus()}</div>
        <ul>{renderMoves()}</ul>
      </div>
    </div>
  );
};
export default Game;
