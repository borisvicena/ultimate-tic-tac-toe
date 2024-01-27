// Square Component

interface Props {
  value: number | null;
  onSquareClick: () => void;
  isActive: boolean;
}

function Square({ value, onSquareClick, isActive }: Props) {
  return (
    <button
      className={`square ${isActive ? "active-board" : ""}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default Square;
