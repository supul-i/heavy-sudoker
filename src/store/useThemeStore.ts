import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "";

type ThemeState = {
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
};

const useThemeStore = create<ThemeState>()(
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
