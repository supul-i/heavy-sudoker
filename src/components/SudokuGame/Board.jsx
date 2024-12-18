import PropTypes from "prop-types";
import { useEffect } from "react";
import usePuzzleStore from "../../store/usePuzzleStore";
import useUserStore from "../../store/useUserStore";
import Cell from "./Cell";

function Board({ sudokuMap, positionOfEmptyCell }) {
  const setCurrentCell = usePuzzleStore((state) => state.setCurrentCell);
  const currentCell = usePuzzleStore((state) => state.currentCell);
  const userInputValues = useUserStore((state) => state.userInputValues);

  useEffect(() => {
    const defaultSelectedCell = Math.min(...positionOfEmptyCell[0]);

    setCurrentCell({ row: 0, col: defaultSelectedCell });
  }, [positionOfEmptyCell, setCurrentCell]);

  const isEmpty = (rowIndex, colIndex) => {
    return positionOfEmptyCell[rowIndex].includes(colIndex);
  };

  const isSelected = (rowIndex, colIndex) => {
    if (currentCell.row === rowIndex && currentCell.col === colIndex) {
      return true;
    }
    return false;
  };

  return (
    <div className="grid h-[600px] w-[600px] grid-cols-9 grid-rows-9 gap-x-[2px] gap-y-[2px] bg-black p-2 text-center font-Pretendard font-semibold">
      {sudokuMap.map((numbersOfRow, rowIndex) => {
        return numbersOfRow.map((number, colIndex) => {
          return (
            <Cell
              key={String(rowIndex) + String(colIndex)}
              rowIndex={rowIndex}
              colIndex={colIndex}
              fixedNumber={number}
              isEmpty={isEmpty(rowIndex, colIndex)}
              isSelected={isSelected(rowIndex, colIndex)}
            />
          );
        });
      })}
    </div>
  );
}

Board.propTypes = {
  sudokuMap: PropTypes.array.isRequired,
  positionOfEmptyCell: PropTypes.array.isRequired,
};

export default Board;
