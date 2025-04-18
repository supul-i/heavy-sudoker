import { create } from "zustand";
import { persist } from "zustand/middleware";

type CurrentCell = { row: number; col: number };

type PuzzleState = {
  answerSudoku: number[][][];
  emptyCellPosition: number[][][];
  currentCell: CurrentCell;
  currentLayer: number;
  completedBoards: boolean[];

  setAnswerSudoku: (newPuzzle: number[][][]) => void;
  setEmptyCellPosition: (emptyCellPosition: number[][][]) => void;
  setCurrentCell: (newCurrentCell: CurrentCell) => void;
  setCurrentLayer: (newLayer: number) => void;
  setBoardsCompleted: (boardLayer: number) => void;
  resetPuzzle: () => void;
};

const initialState: Pick<
  PuzzleState,
  "answerSudoku" | "emptyCellPosition" | "currentCell" | "currentLayer" | "completedBoards"
> = {
  answerSudoku: [],
  emptyCellPosition: Array.from({ length: 9 }, () => []),
  currentCell: { row: 0, col: 0 },
  currentLayer: 8,
  completedBoards: Array.from({ length: 9 }, () => false),
};

const usePuzzleStore = create<PuzzleState>()(
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

      resetPuzzle: () =>
        set(() => ({
          ...initialState,
        })),
    }),
    { name: "puzzle-storage" }
  )
);

export default usePuzzleStore;
