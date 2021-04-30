import React from 'react';
import './square';
import '../index.css';
import Square from './square';

const Board = ({ squares, onClick }) => (
    <div className="board">
        {squares.map((square, i) => ( 
            <Square key={i} value={square} onClick={() => onClick(i)}/>
        ))}
    </div>
);

export default Board;