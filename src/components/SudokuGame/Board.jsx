import PropTypes from "prop-types";

function Board({ sudokuMap, positionOfEmptyCell }) {
  return (
    <div className="grid h-[600px] w-[600px] grid-cols-9 grid-rows-9 gap-x-[2px] gap-y-[2px] bg-black p-2 text-center font-Pretendard font-semibold">
      {sudokuMap.map((numbersOfRow, rowIndex) => {
        return numbersOfRow.map((number, colIndex) => {
          return positionOfEmptyCell[rowIndex].includes(colIndex) ? (
            <div className="cell" key={String(rowIndex) + String(colIndex)}></div>
          ) : (
            <div className="cell" key={String(rowIndex) + String(colIndex)}>
              {number}
            </div>
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