import PropTypes from "prop-types";
import { useEffect } from "react";
import usePuzzleStore from "../../store/usePuzzleStore";
import useUserStore from "../../store/useUserStore";
import Cell from "./Cell";

function Board({ sudokuMap, positionOfEmptyCell }) {
  const userInputValues = useUserStore((state) => state.userInputValues);

  const isEmpty = (rowIndex, colIndex) => {
    return positionOfEmptyCell[rowIndex].includes(colIndex);
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
              userInputValue={userInputValues[rowIndex][colIndex]}
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
