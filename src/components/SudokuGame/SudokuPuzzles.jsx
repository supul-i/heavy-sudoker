import usePuzzleStore from "../../store/usePuzzleStore";
import Board from "../SudokuGame/Board";
import NumericKeypad from "../SudokuGame/NumericKeypad";
import CubeBoard from "./SudokuCube/CubeBoard";
import CubeCell from "./SudokuCube/CubeCell";

function SudokuPuzzles() {
  const viewMode = usePuzzleStore((state) => state.viewMode);
  const answerSudoku = usePuzzleStore((state) => state.answerSudoku);
  const emptyCellPosition = usePuzzleStore((state) => state.emptyCellPosition);

  const isEmpty = (layer, rowIndex, colIndex) => {
    return emptyCellPosition[layer][rowIndex].includes(colIndex);
  };

  const getCubeBoard = () => {
    const cubeBoard = [];

    for (let x = 8; x >= 0; x--) {
      for (let y = 8; y >= 0; y--) {
        for (let z = 8; z >= 0; z--) {
          cubeBoard.push(
            CubeCell({
              position: [x, y, z],
              number: answerSudoku[8 - x][8 - y][8 - z],
              isEmpty: isEmpty(8 - x, 8 - y, 8 - z),
            })
          );
        }
      }
    }

    return cubeBoard;
  };

  return (
    <div className="grid h-screen place-items-center">
      <div className="grid grid-cols-2 place-items-center p-20">
        {viewMode === "threeDimensions" ? (
          <CubeBoard cubeMap={getCubeBoard()} />
        ) : (
          <Board sudokuMap={answerSudoku} positionOfEmptyCell={emptyCellPosition} />
        )}
        <NumericKeypad />
      </div>
    </div>
  );
}

export default SudokuPuzzles;
