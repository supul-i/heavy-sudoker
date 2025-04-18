import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set) => ({
      theme: "",
      setTheme: (newTheme) =>
        set(() => {
          if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }

          return { theme: newTheme };
        }),
    }),
    { name: "theme-storage" }
  )
);

export default useThemeStore;
