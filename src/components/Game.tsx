// Imports
import { useEffect, useRef, useState } from "react";
import Board from "./Board";

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
      if (winner && (activeBoard.row !== null || activeBoard.col !== null)) {
        setActiveBoard({ row: null, col: null });
      }
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
    if (!isValidMove(ultimateRowIndex, ultimateColIndex, smallIndex)) return;
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

  function calculateWinner(board: any) {
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  }

  function calculateOverallWinner(ultimateBoard: any[][][]) {
    const result = ultimateBoard.map((smallBoards) =>
      smallBoards.map((smallBoard) => calculateWinner(smallBoard))
    );

    return calculateWinner(result.flat());
  }

  function isValidMove(
    ultimateRowIndex: number,
    ultimateColIndex: number,
    smallIndex: number
  ) {
    console.log(
      `Move attempted at [${ultimateRowIndex}][${ultimateColIndex}][${smallIndex}]`
    );
    const targetSmallBoard = ultimateBoard[ultimateRowIndex][ultimateColIndex];
    const targetSquare = targetSmallBoard[smallIndex];

    if (targetSquare) {
      return false; // Square is already occupied
    }

    if (isBoardFullOrWon(targetSmallBoard)) {
      return false;
    }

    if (activeBoard.row === null || activeBoard.col === null) {
      return true;
    }

    const activeSmallBoard = ultimateBoard[activeBoard.row][activeBoard.col];
    if (isBoardFullOrWon(activeSmallBoard)) {
      return true;
    }

    const isValid =
      ultimateRowIndex === activeBoard.row &&
      ultimateColIndex === activeBoard.col;
    return isValid;
  }

  function isBoardFullOrWon(board: number[][]) {
    const isFull = board.every((cell: any) => cell !== null);
    const hasWinner = calculateWinner(board) !== null;
    return isFull || hasWinner;
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
    </>
  );
}

export default Game;
