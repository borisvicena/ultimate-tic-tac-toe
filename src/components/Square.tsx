// Square Component

interface Props {
  value: number | null;
  onSquareClick: () => void;
  isActive: boolean;
}

function Square({ value, onSquareClick, isActive }: Props) {
  const activateBoard = `square ${isActive ? "active-board" : ""}`;

  return (
    <button className={activateBoard} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default Square;
