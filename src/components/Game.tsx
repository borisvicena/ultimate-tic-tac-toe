// Imports
import { useEffect, useRef, useState } from "react";
import Board from "./Board";
import {
  isValidMove,
  calculateWinner,
  calculateOverallWinner,
} from "./GameControl";
import Footer from "./Footer";

// Game Component
function Game() {
  // Hooks
  const [ultimateBoard, setUltimateBoard] = useState(
    Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => Array(9).fill(null))
    )
  );
  const [activeBoard, setActiveBoard] = useState<{
    row: number | null;
    col: number | null;
  }>({ row: null, col: null });
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [status, setStatus] = useState("X");
  const [rowI, setRowI] = useState<number | null>(null);
  const [colI, setColI] = useState<number | null>(null);
  const [endOfTheGame, setEndOfTheGame] = useState<boolean>(false);
  const endOfTheGameRef = useRef(false);

  useEffect(() => {
    const overallWinner = calculateOverallWinner(ultimateBoard);
    if (overallWinner && !endOfTheGameRef.current) {
      console.log("END OD THE GAME");
      setEndOfTheGame(true);
      setStatus(`${overallWinner} wins the game!`);
      setActiveBoard({ row: null, col: null });
      endOfTheGameRef.current = true;
    } else if (rowI !== null && colI !== null) {
      const winner = calculateWinner(ultimateBoard[rowI][colI]);
      setStatus(
        winner ? `${winner} wins this board!` : `${xIsNext ? "X" : "O"}`
      );
      // if (winner && (activeBoard.row !== null || activeBoard.col !== null)) {
      //   setActiveBoard({ row: null, col: null });
      // }
      if (overallWinner) {
        setStatus(`${overallWinner} wins the game!`);
      }
    }
  }, [ultimateBoard, rowI, colI, xIsNext, activeBoard]);

  function handleSquareClick(
    ultimateRowIndex: number,
    ultimateColIndex: number,
    smallIndex: any
  ) {
    if (
      !isValidMove(
        ultimateBoard,
        ultimateRowIndex,
        ultimateColIndex,
        activeBoard,
        smallIndex
      )
    )
      return;
    if (endOfTheGame) return;

    setUltimateBoard((prevUltimateBoard) => {
      const newUltimateBoard = prevUltimateBoard.map((row, rowIndex) =>
        rowIndex === ultimateRowIndex
          ? row.map((col, colIndex) =>
              colIndex === ultimateColIndex
                ? col.map((cell, cellIndex) =>
                    cellIndex === smallIndex ? (xIsNext ? "X" : "O") : cell
                  )
                : col
            )
          : row
      );
      return newUltimateBoard;
    });
    const nextRow = Math.floor(smallIndex / 3);
    const nextCol = smallIndex % 3;
    setActiveBoard({ row: nextRow, col: nextCol });
    setRowI(ultimateRowIndex);
    setColI(ultimateColIndex);
    setXIsNext(!xIsNext);
  }

  return (
    <>
      <div>
        <h1>Ultimate Tic-Tac-Toe</h1>
        <h2>Player: {status}</h2>
      </div>
      <Board
        ultimateBoard={ultimateBoard}
        onSquareClick={handleSquareClick}
        activeBoard={activeBoard}
        calculateWinner={calculateWinner}
      />
      <Footer>@borisvicena</Footer>
    </>
  );
}

export default Game;
