import { create } from "zustand";
import { persist } from "zustand/middleware";

const getInitialTheme = () => {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = isDark ? "dark" : "light";

  if (initialTheme === "light") {
    document.documentElement.classList.remove("dark");
  }

  return initialTheme;
};

const initialState = {
  answerSudoku: [],
  emptyCellPosition: Array.from({ length: 9 }, () => []),
  currentCell: { row: 0, col: 0 },
  currentLayer: 8,
  completedBoards: Array.from({ length: 9 }, () => false),
  theme: getInitialTheme(),
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

      setBoardsCompleted: (boardLayer) =>
        set((state) => {
          const newCompletedBoards = [...state.completedBoards];
          newCompletedBoards[boardLayer] = true;
          return { completedBoards: newCompletedBoards };
        }),

      setTheme: (newTheme) =>
        set(() => {
          if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }

          return { theme: newTheme };
        }),

      resetPuzzle: () =>
        set(() => ({
          ...initialState,
        })),
    }),
    { name: "puzzle-storage" }
  )
);

export default usePuzzleStore;
