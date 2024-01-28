// Imports
import SmallBoard from "./SmallBoard";

interface Props {
  ultimateBoard: number[][][];
  activeBoard: { row: number | null; col: number | null };
  onSquareClick: (
    ultimateRowIndex: number,
    ultimateColIndex: number,
    smallIndex: number
  ) => void;
  calculateWinner: (board: any) => string | null;
}

// Board Component
function Board({
  ultimateBoard,
  activeBoard,
  onSquareClick,
  calculateWinner,
}: Props) {
  return (
    <div className="ultimateBoard">
      {ultimateBoard.map((row, ultimateRowIndex) => (
        <div key={ultimateRowIndex} className="board-row">
          {row.map((smallBoard, ultimateColIndex) => (
            <SmallBoard
              ultimateRowIndex={ultimateRowIndex}
              ultimateColIndex={ultimateColIndex}
              calculateWinner={calculateWinner}
              smallBoard={smallBoard}
              activeBoard={activeBoard}
              onSquareClick={onSquareClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
