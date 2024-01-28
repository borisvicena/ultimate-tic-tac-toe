import Square from "./Square";

interface Props {
  activeBoard: { row: number | null; col: number | null };
  ultimateRowIndex: number;
  ultimateColIndex: number;
  smallBoard: number[];
  onSquareClick: (
    ultimateRowIndex: number,
    ultimateColIndex: number,
    smallIndex: number
  ) => void;
  calculateWinner: (board: any) => string | null;
}

function SmallBoard({
  ultimateRowIndex,
  ultimateColIndex,
  calculateWinner,
  smallBoard,
  activeBoard,
  onSquareClick,
}: Props) {
  const winner = calculateWinner(smallBoard);
  const checkIfWinner = winner ? `winner ${winner}` : "small-board";
  return (
    <div key={ultimateColIndex} className={checkIfWinner}>
      {winner ? (
        <div>{winner}</div>
      ) : (
        smallBoard.map((value, smallIndex) => (
          <Square
            key={smallIndex}
            value={value}
            onSquareClick={() =>
              onSquareClick(ultimateRowIndex, ultimateColIndex, smallIndex)
            }
            isActive={
              activeBoard.row === ultimateRowIndex &&
              activeBoard.col === ultimateColIndex
            }
          />
        ))
      )}
    </div>
  );
}

export default SmallBoard;
