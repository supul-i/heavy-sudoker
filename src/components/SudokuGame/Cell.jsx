import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import usePuzzleStore from "../../store/usePuzzleStore";
import { playClickKeyPadSound, playClickSound } from "../../utils/audio";

function Cell({
  rowIndex,
  colIndex,
  fixedNumber,
  isEmpty,
  isSelected,
  userInputValue,
  isIncorrect,
  handleSelectedNumber,
  isBackgroundCell,
}) {
  const cell = useRef();
  const setCurrentCell = usePuzzleStore((state) => state.setCurrentCell);

  useEffect(() => {
    cell.current?.focus();
  }, []);

  const handleCells = () => {
    playClickSound();
    setCurrentCell({ row: rowIndex, col: colIndex });
  };

  const handleKeyBoard = (e) => {
    if (Number(e.key) > 0 && Number(e.key) < 10) {
      playClickKeyPadSound();
      handleSelectedNumber(Number(e.key));
    }
  };

  return (
    <>
      {isEmpty ? (
        <div
          className={`cell cursor-pointer focus:outline-none ${
            isSelected && isIncorrect
              ? "bg-cyan-200 text-red-500"
              : isIncorrect
                ? "bg-red-200 text-red-500 hover:text-red-600"
                : isSelected
                  ? "bg-[#00FFFF]"
                  : isBackgroundCell
                    ? "bg-lime-100"
                    : "bg-white"
          } hover:bg-cyan-200`}
          ref={cell}
          tabIndex={0}
          onClick={handleCells}
          onKeyDown={handleKeyBoard}
        >
          {userInputValue}
        </div>
      ) : (
        <div
          className={`cell pointer-events-none ${
            isBackgroundCell ? "bg-lime-50" : "bg-gray-200"
          } ${isIncorrect && "text-red-500"}`}
        >
          {fixedNumber}
        </div>
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
  isBackgroundCell: PropTypes.bool.isRequired,
};

export default Cell;
