import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { PUZZLE_SIZE } from "../constants/puzzle";
import { persist } from "zustand/middleware";

const initialState = {
  userInputValues: Array.from({ length: PUZZLE_SIZE }, () =>
    Array.from({ length: PUZZLE_SIZE }, () => Array(PUZZLE_SIZE).fill(null))
  ),
};

const useUserStore = create(
  persist(
    immer((set) => ({
      ...initialState,

      setUserInputValues: (userInputValues) =>
        set(() => ({
          userInputValues: userInputValues,
        })),

      updateUserInputValue: (layer, rowIndex, colIndex, newInputValue) =>
        set((state) => {
          state.userInputValues[layer][rowIndex][colIndex] = newInputValue;
        }),

      resetLayerUserHistory: (layer) =>
        set((state) => {
          state.userInputValues[layer] = Array.from({ length: PUZZLE_SIZE }, () =>
            Array(PUZZLE_SIZE).fill(null)
          );
        }),

      resetAllUserHistory: () =>
        set(() => ({
          ...initialState,
        })),
    })),
    { name: "user-storage" }
  )
);

export default useUserStore;
