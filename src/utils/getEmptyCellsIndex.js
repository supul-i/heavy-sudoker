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

  return emptyCellPosition;
};

export default getEmptyCellsIndex;
