import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import SudokuPuzzles from "./components/SudokuGame/SudokuPuzzles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sudoku",
    element: <SudokuPuzzles />,
  },
]);

export default router;
