import { PUZZLE_SIZE } from "../constants/puzzle";

const getRandomNum = (maxNumber) => Math.floor(Math.random() * maxNumber);

const setDiagonalBlock = (sudoku) => {
  for (let firstIndexOfBlock = 0; firstIndexOfBlock < PUZZLE_SIZE; firstIndexOfBlock += 3) {
    const validNumbers = Array.from({ length: 9 }, (_, i) => i + 1);

    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      for (let colIndex = 0; colIndex < 3; colIndex++) {
        const randomIndex = getRandomNum(validNumbers.length);
        const randomNumber = validNumbers[randomIndex];

        sudoku[firstIndexOfBlock + rowIndex][firstIndexOfBlock + colIndex] = randomNumber;
        validNumbers.splice(randomIndex, 1);
      }
    }
  }

  fillRemainCells(sudoku, 0, 3);

  return sudoku;
};

const isValid = (sudoku, rowIndex, colIndex, number) => {
  const checkRow = () => {
    return !sudoku[rowIndex].some((filledValue) => filledValue === number);
  };

  const checkCol = () => {
    for (let row = 0; row < PUZZLE_SIZE; row++) {
      if (sudoku[row][colIndex] === number) {
        return false;
      }
    }

    return true;
  };

  const checkBlock = () => {
    const rowIndexOfBlock = rowIndex - (rowIndex % 3);
    const colIndexOfBlock = colIndex - (colIndex % 3);

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (sudoku[rowIndexOfBlock + row][colIndexOfBlock + col] === number) {
          return false;
        }
      }
    }

    return true;
  };

  return checkRow() && checkCol() && checkBlock();
};

const fillRemainCells = (sudoku, rowIndex, colIndex) => {
  if (rowIndex === PUZZLE_SIZE - 1 && colIndex === PUZZLE_SIZE) {
    return true;
  }

  if (colIndex === PUZZLE_SIZE) {
    rowIndex += 1;
    colIndex = 0;
  }

  if (sudoku[rowIndex][colIndex] !== 0) {
    return fillRemainCells(sudoku, rowIndex, colIndex + 1);
  }

  let previousNum = 0;
  let validNumbers = Array.from({ length: 9 }, (_, i) => i + 1);

  for (let numberOfAttempt = 9; numberOfAttempt > 0; numberOfAttempt--) {
    validNumbers = validNumbers.filter((number) => number !== previousNum);

    const randomIndex = getRandomNum(validNumbers.length);
    const randomNumber = validNumbers[randomIndex];

    if (isValid(sudoku, rowIndex, colIndex, randomNumber)) {
      sudoku[rowIndex][colIndex] = randomNumber;

      if (fillRemainCells(sudoku, rowIndex, colIndex + 1)) {
        return true;
      }

      previousNum = sudoku[rowIndex][colIndex];
      sudoku[rowIndex][colIndex] = 0;
    } else {
      validNumbers.splice(randomIndex, 1);
    }
  }

  return false;
};

const setSudoku = () => {
  const sudoku = Array.from({ length: PUZZLE_SIZE }, () => Array(PUZZLE_SIZE).fill(0));

  return setDiagonalBlock(sudoku);
};

export default setSudoku;
export { getRandomNum };
