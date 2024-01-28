export function calculateWinner(board: any) {
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

export function calculateOverallWinner(ultimateBoard: any[][][]) {
  const result = ultimateBoard.map((smallBoards) =>
    smallBoards.map((smallBoard) => calculateWinner(smallBoard))
  );

  return calculateWinner(result.flat());
}

export function isValidMove(
  ultimateBoard: any,
  ultimateRowIndex: number,
  ultimateColIndex: number,
  activeBoard: any,
  smallIndex: number
) {
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

export function isBoardFullOrWon(board: number[][]) {
  const isFull = board.every((cell: any) => cell !== null);
  const hasWinner = calculateWinner(board) !== null;
  return isFull || hasWinner;
}
