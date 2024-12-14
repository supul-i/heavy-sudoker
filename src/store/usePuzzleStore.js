import { create } from "zustand";

const initialState = {
  answerSudoku: [],
};

const usePuzzleStore = create((set) => ({
  ...initialState,

  setAnswerSudoku: (newPuzzle) =>
    set(() => ({
      answerSudoku: newPuzzle,
    })),
}));

export default usePuzzleStore;
