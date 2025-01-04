import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import usePuzzleStore from "../../store/usePuzzleStore";

function Cell({ rowIndex, colIndex, fixedNumber, isEmpty, isSelected, userInputValue }) {
  const cell = useRef();
  const setCurrentCell = usePuzzleStore((state) => state.setCurrentCell);

  useEffect(() => {
    cell.current?.focus();
  }, []);

  const handleCells = () => {
    setCurrentCell({ row: rowIndex, col: colIndex });
  };

  return (
    <>
      {isEmpty ? (
        <div
          className={`cell cursor-pointer focus:outline-none ${isSelected ? "bg-lime-100 ring ring-inset ring-lime-200" : "bg-white"}`}
          ref={cell}
          tabIndex={0}
          onClick={handleCells}
        >
          {userInputValue}
        </div>
      ) : (
        <div className="cell bg-gray-200">{fixedNumber}</div>
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
};

export default Cell;
