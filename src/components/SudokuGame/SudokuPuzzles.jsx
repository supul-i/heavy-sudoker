import { useLocation } from "react-router-dom";
import getEmptyCellsIndex from "../../utils/getEmptyCellsIndex";
import setSudoku from "../../utils/setSudoku";
import Board from "../SudokuGame/Board";
import NumericKeypad from "../SudokuGame/NumericKeypad";

function SudokuPuzzles() {
  const location = useLocation();
  const difficultyLevel = location.state.difficulty;
  const positionOfEmptyCell = getEmptyCellsIndex(difficultyLevel);
  const sudokuMap = setSudoku();

  return (
    <div className="grid h-screen place-items-center">
      <div className="grid grid-cols-2 place-items-center p-20">
        <Board sudokuMap={sudokuMap} positionOfEmptyCell={positionOfEmptyCell} />
        <NumericKeypad />
      </div>
    </div>
  );
}

export default SudokuPuzzles;
