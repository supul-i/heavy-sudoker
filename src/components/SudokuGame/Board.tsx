import { useCallback, useEffect } from "react";
import usePuzzleStore from "../../store/usePuzzleStore";
import useUserStore from "../../store/useUserStore";
import { isValid } from "../../utils/setSudoku";
import Cell from "./Cell";

type BoardProps = {
  sudokuMap: number[][];
  positionOfEmptyCell: number[][];
};

function Board({ sudokuMap, positionOfEmptyCell }: BoardProps) {
  const setCurrentCell = usePuzzleStore((state) => state.setCurrentCell);
  const currentCell = usePuzzleStore((state) => state.currentCell);
  const currentLayer = usePuzzleStore((state) => state.currentLayer);
  const setBoardsCompleted = usePuzzleStore((state) => state.setBoardsCompleted);
  const userInputValues = useUserStore((state) => state.userInputValues) as number[][][];
  const updateUserInputValue = useUserStore((state) => state.updateUserInputValue);

  useEffect(() => {
    const defaultSelectedCell = Math.min(...positionOfEmptyCell[0]);

    setCurrentCell({ row: 0, col: defaultSelectedCell });
  }, [positionOfEmptyCell, setCurrentCell]);

  const isEmpty = (rowIndex: number, colIndex: number): boolean => {
    return positionOfEmptyCell[rowIndex].includes(colIndex);
  };

  const CheckUserInput = useCallback(() => {
    const incorrectPosition = new Map();
    let sudokuPuzzle = sudokuMap.map((answers, rowIndex) => {
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
  }, [sudokuMap, positionOfEmptyCell, userInputValues, currentLayer]);

  const checkCompletedBoard = (): boolean => {
    const { incorrectPosition, sudokuPuzzle } = CheckUserInput();
    const allCellsFilled = sudokuPuzzle.every((row) => row.every((cell) => cell !== 0));

    return allCellsFilled && incorrectPosition.size === 0;
  };

  useEffect(() => {
    const isCompleted = checkCompletedBoard();

    if (isCompleted) {
      setBoardsCompleted(currentLayer);
    }
  }, [currentLayer, userInputValues, sudokuMap, positionOfEmptyCell, setBoardsCompleted]);

  const isIncorrect = (row: number, col: number, inputValue: number): boolean => {
    const { incorrectPosition, sudokuPuzzle } = CheckUserInput();
    let isIncorrect = false;

    for (const position of incorrectPosition.keys()) {
      const [incorrectRow, incorrectCol] = position.split("-").map(Number);

      if (
        incorrectRow === row ||
        incorrectCol === col ||
        (row - (row % 3) === incorrectRow - (incorrectRow % 3) &&
          col - (col % 3) === incorrectCol - (incorrectCol % 3))
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

  const isSelected = (rowIndex: number, colIndex: number): boolean => {
    if (currentCell.row === rowIndex && currentCell.col === colIndex) {
      return true;
    }
    return false;
  };

  const handleSelectedNumber = (number: number): void => {
    updateUserInputValue(8 - currentLayer, currentCell.row, currentCell.col, number);
  };

  const isBackgroundCell = (rowIndex: number, colIndex: number): boolean => {
    if (
      currentCell.row === rowIndex ||
      currentCell.col === colIndex ||
      (currentCell.row - (currentCell.row % 3) === rowIndex - (rowIndex % 3) &&
        currentCell.col - (currentCell.col % 3) === colIndex - (colIndex % 3))
    ) {
      return true;
    }

    return false;
  };

  return (
    <div className="mb-10 grid h-[600px] w-[600px] grid-cols-9 grid-rows-9 gap-x-[2px] gap-y-[2px] bg-black p-2 text-center font-Pretendard font-semibold dark:bg-cyan-700">
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
              handleSelectedNumber={handleSelectedNumber}
              isBackgroundCell={isBackgroundCell(rowIndex, colIndex)}
            />
          );
        });
      })}
    </div>
  );
}

export default Board;
