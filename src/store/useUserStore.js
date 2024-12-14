import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { PUZZLE_SIZE } from "../constants/puzzle";

const initialState = {
  userInputValues: Array.from({ length: PUZZLE_SIZE }, () => Array(PUZZLE_SIZE).fill(null)),
};

const useUserStore = create(
  immer((set) => ({
    ...initialState,

    setUserInputValues: (userInputValues) =>
      set(() => ({
        userInputValues: userInputValues,
      })),
    updateUserInputValue: (rowIndex, colIndex, newInputValue) =>
      set((state) => {
        state.userInputValues[rowIndex][colIndex] = newInputValue;
      }),
  }))
);

export default useUserStore;
