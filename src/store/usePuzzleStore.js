import { create } from "zustand";

const initialState = {
  answerSudoku: [],
  emptyCellPosition: Array.from({ length: 9 }, () => []),
  currentCell: { row: 0, col: 0 },
};

const usePuzzleStore = create((set) => ({
  ...initialState,

  setAnswerSudoku: (newPuzzle) =>
    set(() => ({
      answerSudoku: newPuzzle,
    })),
  setEmptyCellPosition: (emptyCellPosition) =>
    set(() => ({
      emptyCellPosition: emptyCellPosition,
    })),
  setCurrentCell: (currentCell) =>
    set(() => ({
      currentCell: currentCell,
    })),
  resetPuzzle: () =>
    set(() => ({
      ...initialState,
    })),
}));

export default usePuzzleStore;
