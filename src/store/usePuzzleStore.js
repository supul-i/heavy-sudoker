import { create } from "zustand";

const initialState = {
  answerSudoku: [],
  emptyCellPosition: Array.from({ length: 9 }, () => []),
  currentCell: { row: 0, col: 0 },
  viewMode: "threeDimensions",
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
  setViewMode: () =>
    set((state) => ({
      viewMode: state.viewMode === "threeDimensions" ? "twoDimensions" : "threeDimensions",
    })),
  resetPuzzle: () =>
    set(() => ({
      ...initialState,
    })),
}));

export default usePuzzleStore;
