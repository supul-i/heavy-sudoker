import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";
import usePuzzleStore from "../../store/usePuzzleStore";
import useUserStore from "../../store/useUserStore";
import { isValid } from "../../utils/setSudoku";
import Cell from "./Cell";

function Board({ sudokuMap, positionOfEmptyCell }) {
  const setCurrentCell = usePuzzleStore((state) => state.setCurrentCell);
  const currentCell = usePuzzleStore((state) => state.currentCell);
  const currentLayer = usePuzzleStore((state) => state.currentLayer);
  const userInputValues = useUserStore((state) => state.userInputValues);
  const setBoardsCompleted = usePuzzleStore((state) => state.setBoardsCompleted);
  const incorrectPosition = new Map();
  let sudokuPuzzle = useMemo(() => [], []);

  useEffect(() => {
    const defaultSelectedCell = Math.min(...positionOfEmptyCell[0]);

    setCurrentCell({ row: 0, col: defaultSelectedCell });
  }, [positionOfEmptyCell, setCurrentCell]);

  const isEmpty = (rowIndex, colIndex) => {
    return positionOfEmptyCell[rowIndex].includes(colIndex);
  };

  const CheckUserInput = () => {
    sudokuPuzzle = sudokuMap.map((answers, rowIndex) => {
      return answers.map((value, colIndex) => {
        if (isEmpty(rowIndex, colIndex)) {
          if (userInputValues[8 - currentLayer][rowIndex][colIndex]) {
            return userInputValues[8 - currentLayer][rowIndex][colIndex];
          }

          return 0;
        } else {
          return value;
        }
      });
    });

    userInputValues[8 - currentLayer].forEach((inputValues, rowIndex) => {
      inputValues.forEach((inputValue, colIndex) => {
        if (inputValue) {
          sudokuPuzzle[rowIndex][colIndex] = 0;
          const isInputValid = isValid(sudokuPuzzle, rowIndex, colIndex, inputValue);
          sudokuPuzzle[rowIndex][colIndex] = inputValue;

          if (!isInputValid) {
            incorrectPosition.set(`${rowIndex}-${colIndex}`, inputValue);
          } else if (incorrectPosition.has(`${rowIndex}-${colIndex}`)) {
            incorrectPosition.delete(`${rowIndex}-${colIndex}`);
          }
        }
      });
    });

    return { incorrectPosition, sudokuPuzzle };
  };

  const isIncorrect = (row, col, inputValue) => {
    const { incorrectPosition, sudokuPuzzle } = CheckUserInput();
    let isIncorrect = false;

    for (const position of incorrectPosition.keys()) {
      const [incorrectRow, incorrectCol] = position.split("-");

      if (
        Number(incorrectRow) === row ||
        Number(incorrectCol) === col ||
        (row - (row % 3) === Number(incorrectRow) - (Number(incorrectRow) % 3) &&
          col - (col % 3) === Number(incorrectCol) - (Number(incorrectCol) % 3))
      ) {
        isIncorrect =
          incorrectPosition.get(position) === sudokuPuzzle[row][col] ||
          incorrectPosition.get(position) === inputValue;

        if (isIncorrect) {
          return isIncorrect;
        }
      }
    }

    return isIncorrect;
  };

  useEffect(() => {
    const checkCompletedBoard = () => {
      const allCellsFilled = sudokuPuzzle.every((row) => row.every((cell) => cell !== 0));

      return allCellsFilled && incorrectPosition.size === 0;
    };

    if (checkCompletedBoard()) {
      setBoardsCompleted(currentLayer);
    }
  }, [currentLayer, incorrectPosition.size, setBoardsCompleted, sudokuPuzzle]);

  const isSelected = (rowIndex, colIndex) => {
    if (currentCell.row === rowIndex && currentCell.col === colIndex) {
      return true;
    }
    return false;
  };

  return (
    <div className="mb-10 grid h-[600px] w-[600px] grid-cols-9 grid-rows-9 gap-x-[2px] gap-y-[2px] bg-black p-2 text-center font-Pretendard font-semibold">
      {sudokuMap.map((numbersOfRow, rowIndex) => {
        return numbersOfRow.map((number, colIndex) => {
          return (
            <Cell
              key={`${rowIndex}${colIndex}`}
              rowIndex={rowIndex}
              colIndex={colIndex}
              fixedNumber={number}
              isEmpty={isEmpty(rowIndex, colIndex)}
              isSelected={isSelected(rowIndex, colIndex)}
              userInputValue={userInputValues[8 - currentLayer][rowIndex][colIndex]}
              isIncorrect={isIncorrect(
                rowIndex,
                colIndex,
                userInputValues[8 - currentLayer][rowIndex][colIndex]
              )}
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
