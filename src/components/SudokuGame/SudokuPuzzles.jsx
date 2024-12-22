import { useEffect, useState } from "react";
import usePuzzleStore from "../../store/usePuzzleStore";
import useUserStore from "../../store/useUserStore";
import Board from "../SudokuGame/Board";
import NumericKeypad from "../SudokuGame/NumericKeypad";
import CubeBoard from "./SudokuCube/CubeBoard";
import CubeCell from "./SudokuCube/CubeCell";

function SudokuPuzzles() {
  const viewMode = usePuzzleStore((state) => state.viewMode);
  const answerSudoku = usePuzzleStore((state) => state.answerSudoku);
  const emptyCellPosition = usePuzzleStore((state) => state.emptyCellPosition);
  const currentLayer = usePuzzleStore((state) => state.currentLayer);
  const userInputValues = useUserStore((state) => state.userInputValues);
  const [sudokuMap, setSudokuMap] = useState([]);
  const [positionOfEmptyCell, setPositionOfEmptyCell] = useState([]);

  useEffect(() => {
    setSudokuMap(answerSudoku[8 - currentLayer]);
    setPositionOfEmptyCell(emptyCellPosition[8 - currentLayer]);
  }, [answerSudoku, emptyCellPosition, currentLayer]);

  const getCubeBoard = () => {
    const isEmpty = (layer, rowIndex, colIndex) => {
      return emptyCellPosition[layer][rowIndex].includes(colIndex);
    };
    const cubeBoard = [];

    for (let x = 8; x >= 0; x--) {
      for (let y = 8; y >= 0; y--) {
        for (let z = 8; z >= 0; z--) {
          cubeBoard.push(
            <CubeCell
              key={`${x}${y}${z}`}
              position={[x, y, z]}
              number={answerSudoku[8 - x][8 - y][8 - z]}
              isEmpty={isEmpty(8 - x, 8 - y, 8 - z)}
              userInputValue={userInputValues[8 - x][8 - y][8 - z]}
            />
          );
        }
      }
    }

    return cubeBoard;
  };

  return (
    <div className="grid h-screen place-items-center dark:bg-black">
      <div className="grid grid-cols-2 place-items-center">
        {viewMode === "threeDimensions" ? (
          <CubeBoard getCubeBoard={getCubeBoard} />
        ) : (
          <Board sudokuMap={sudokuMap} positionOfEmptyCell={positionOfEmptyCell} />
        )}
        <NumericKeypad />
      </div>
    </div>
  );
}

export default SudokuPuzzles;
