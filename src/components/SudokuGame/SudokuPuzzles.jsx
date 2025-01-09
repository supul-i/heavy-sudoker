import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OutlineButton from "../../shared/components/OutlineButton";
import usePuzzleStore from "../../store/usePuzzleStore";
import useUserStore from "../../store/useUserStore";
import Board from "../SudokuGame/Board";
import NumericKeypad from "../SudokuGame/NumericKeypad";
import CubeBoard from "./SudokuCube/CubeBoard";
import CubeCell from "./SudokuCube/CubeCell";

function SudokuPuzzles() {
  const [viewMode, setViewMode] = useState("threeDimensions");
  const [isLayerView, setIsLayerView] = useState(false);
  const [sudokuMap, setSudokuMap] = useState([]);
  const [positionOfEmptyCell, setPositionOfEmptyCell] = useState([]);
  const navigate = useNavigate();
  const answerSudoku = usePuzzleStore((state) => state.answerSudoku);
  const emptyCellPosition = usePuzzleStore((state) => state.emptyCellPosition);
  const currentLayer = usePuzzleStore((state) => state.currentLayer);
  const userInputValues = useUserStore((state) => state.userInputValues);

  useEffect(() => {
    setSudokuMap(answerSudoku[8 - currentLayer]);
    setPositionOfEmptyCell(emptyCellPosition[8 - currentLayer]);
  }, [answerSudoku, emptyCellPosition, currentLayer]);

  const getCubeBoard = useCallback(() => {
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
  }, [answerSudoku, emptyCellPosition, userInputValues]);

  const handleLayerView = () => {
    setIsLayerView(!isLayerView);
  };

  const handleViewMode = () => {
    if (viewMode === "threeDimensions") {
      setViewMode("twoDimensions");
    } else {
      setViewMode("threeDimensions");
    }
  };

  const handleGoHomePage = () => {
    navigate("/", { replace: true });
  };

  return (
    <>
      <div className="grid h-screen place-items-center dark:bg-black">
        {viewMode === "threeDimensions" ? (
          <div className="grid h-screen w-screen place-items-center">
            <CubeBoard getCubeBoard={getCubeBoard} isLayerView={isLayerView} />
          </div>
        ) : (
          <div className="grid grid-cols-2 place-items-center">
            <Board sudokuMap={sudokuMap} positionOfEmptyCell={positionOfEmptyCell} />
            <NumericKeypad />
          </div>
        )}
      </div>
      <div className="fixed bottom-3 left-1/2 box-content flex h-14 -translate-x-1/2 gap-3 rounded-md bg-gray-200 p-2.5 px-5">
        <OutlineButton text="홈" onClick={handleGoHomePage} size="S" />
        {viewMode === "threeDimensions" && isLayerView ? (
          <>
            <OutlineButton text={"되돌리기"} onClick={handleLayerView} size="S" />
            <OutlineButton text={"문제 풀기"} onClick={handleViewMode} size="S" />
          </>
        ) : viewMode === "threeDimensions" ? (
          <OutlineButton text={"펼쳐보기"} onClick={handleLayerView} size="S" />
        ) : (
          <OutlineButton text={"전체 보기"} onClick={handleViewMode} size="S" />
        )}
      </div>
    </>
  );
}

export default SudokuPuzzles;
