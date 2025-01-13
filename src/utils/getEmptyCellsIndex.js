import { getRandomNum } from "./setSudoku";
import { PUZZLE_SIZE } from "../constants/puzzle";

const setEmptyCell = (colIndexes) => {
  const selectableIndexes = Array.from({ length: 9 }, (_, index) => index).filter(
    (number) => !colIndexes.includes(number)
  );
  const randomIndex = getRandomNum(selectableIndexes.length);

  colIndexes.push(selectableIndexes[randomIndex]);

  return colIndexes;
};

const getEmptyCellsIndex = (difficultyLevel) => {
  const numberOfEmptyCells =
    difficultyLevel === "easy" ? 43 : difficultyLevel === "normal" ? 51 : 56;
  let emptyCellPosition = Array.from({ length: 9 }, () => []);

  for (let i = 0; i < numberOfEmptyCells; i++) {
    const randomRowIndex = getRandomNum(PUZZLE_SIZE);

    if (emptyCellPosition[randomRowIndex].length >= PUZZLE_SIZE - 1) {
      i--;
    } else {
      const emptyCells = setEmptyCell(emptyCellPosition[randomRowIndex]);
      emptyCellPosition[randomRowIndex] = emptyCells;
    }
  }

  const emptyLines = [];
  const fullLines = [];

  emptyCellPosition.forEach((emptyCells, index) => {
    if (emptyCells.length === 0) {
      emptyLines.push(index);
    } else if (emptyCells.length > PUZZLE_SIZE / 2) {
      fullLines.push(index);
    }
  });

  if (emptyLines.length !== 0) {
    emptyLines.forEach((emptyLine) => {
      for (const fullLine of fullLines) {
        if (emptyCellPosition[fullLine].length > PUZZLE_SIZE / 2) {
          const deleteCount = Math.floor(emptyCellPosition[fullLine].length / 2);

          emptyCellPosition[emptyLine].push(...emptyCellPosition[fullLine].splice(0, deleteCount));
          return;
        }
      }

      if (emptyCellPosition[emptyLine].length === 0) {
        for (const fullLine of fullLines) {
          if (emptyCellPosition[fullLine].length > 1) {
            emptyCellPosition[emptyLine].push(...emptyCellPosition[fullLine].splice(0, 1));
            return;
          }
        }
      }
    });
  }

  return emptyCellPosition;
};

export default getEmptyCellsIndex;
