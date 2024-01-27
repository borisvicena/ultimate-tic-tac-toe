// Imports
import Square from "./Square";

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
            <div
              key={ultimateColIndex}
              className={
                calculateWinner(smallBoard)
                  ? `winner ${calculateWinner(smallBoard)}`
                  : "small-board"
              }
            >
              {calculateWinner(smallBoard) ? (
                <div>{calculateWinner(smallBoard)}</div>
              ) : (
                smallBoard.map((value, smallIndex) => (
                  <Square
                    key={smallIndex}
                    value={value}
                    onSquareClick={() =>
                      onSquareClick(
                        ultimateRowIndex,
                        ultimateColIndex,
                        smallIndex
                      )
                    }
                    isActive={
                      activeBoard.row === ultimateRowIndex &&
                      activeBoard.col === ultimateColIndex
                    }
                  />
                ))
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
