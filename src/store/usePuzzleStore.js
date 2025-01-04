import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  answerSudoku: [],
  emptyCellPosition: Array.from({ length: 9 }, () => []),
  currentCell: { row: 0, col: 0 },
  currentLayer: 8,
};

const usePuzzleStore = create(
  persist(
    (set) => ({
      ...initialState,

      setAnswerSudoku: (newPuzzle) =>
        set(() => ({
          answerSudoku: newPuzzle,
        })),

      setEmptyCellPosition: (emptyCellPosition) =>
        set(() => ({
          emptyCellPosition: emptyCellPosition,
        })),

      setCurrentCell: (newCurrentCell) =>
        set((state) => ({
          currentCell: {
            ...state.currentCell,
            row: newCurrentCell.row,
            col: newCurrentCell.col,
          },
        })),

      setCurrentLayer: (newLayer) =>
        set(() => ({
          currentLayer: newLayer,
        })),

      resetPuzzle: () =>
        set(() => ({
          ...initialState,
        })),
    }),
    { name: "puzzle-storage" }
  )
);

export default usePuzzleStore;
