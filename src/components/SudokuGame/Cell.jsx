import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import usePuzzleStore from "../../store/usePuzzleStore";

function Cell({
  rowIndex,
  colIndex,
  fixedNumber,
  isEmpty,
  isSelected,
  userInputValue,
  isIncorrect,
  handleSelectedNumber,
}) {
  const cell = useRef();
  const setCurrentCell = usePuzzleStore((state) => state.setCurrentCell);

  useEffect(() => {
    cell.current?.focus();
  }, []);

  const handleCells = () => {
    setCurrentCell({ row: rowIndex, col: colIndex });
  };

  const handleKeyBoard = (e) => {
    if (Number(e.key) > 0 && Number(e.key) < 9) {
      handleSelectedNumber(Number(e.key));
    }
  };

  return (
    <>
      {isEmpty ? (
        <div
          className={`cell cursor-pointer focus:outline-none ${isSelected && isIncorrect ? "bg-lime-100 text-red-500 ring ring-inset ring-lime-200" : isIncorrect ? "bg-red-100 text-red-500 hover:text-red-600" : isSelected ? "bg-lime-100" : "bg-white"} hover:bg-lime-200`}
          ref={cell}
          tabIndex={0}
          onClick={handleCells}
          onKeyDown={handleKeyBoard}
        >
          {userInputValue}
        </div>
      ) : (
        <div className={`cell bg-gray-200 ${isIncorrect && "text-red-500"}`}>{fixedNumber}</div>
      )}
    </>
  );
}

Cell.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  colIndex: PropTypes.number.isRequired,
  fixedNumber: PropTypes.number.isRequired,
  isEmpty: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  userInputValue: PropTypes.number,
  isIncorrect: PropTypes.bool.isRequired,
  handleSelectedNumber: PropTypes.func.isRequired,
};

export default Cell;
