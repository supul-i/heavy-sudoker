import PropTypes from "prop-types";
import usePuzzleStore from "../../store/usePuzzleStore";

function Cell({ rowIndex, colIndex, fixedNumber, isEmpty, userInputValue }) {
  const setCurrentCell = usePuzzleStore((state) => state.setCurrentCell);

  const handleCells = () => {
    setCurrentCell({ row: rowIndex, col: colIndex });
  };

  return (
    <>
      {isEmpty ? (
        <div className="cell" onClick={handleCells}>
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
  userInputValue: PropTypes.number,
};

export default Cell;
