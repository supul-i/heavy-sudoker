import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundSound from "../../shared/components/BackgroundSound";
import Modal from "../../shared/components/Modal";
import OutlineButton from "../../shared/components/OutlineButton";
import usePuzzleStore from "../../store/usePuzzleStore";
import useThemeStore from "../../store/useThemeStore";
import useUserStore from "../../store/useUserStore";
import Board from "./Board";
import NumericKeypad from "./NumericKeypad";
import CubeBoard from "./SudokuCube/CubeBoard";
import CubeCell from "./SudokuCube/CubeCell";

type ViewMode = "threeDimensions" | "twoDimensions";

function SudokuPuzzles() {
  const answerSudoku = usePuzzleStore((state) => state.answerSudoku);
  const emptyCellPosition = usePuzzleStore((state) => state.emptyCellPosition);
  const currentLayer = usePuzzleStore((state) => state.currentLayer);
  const userInputValues = useUserStore((state) => state.userInputValues);
  const completedBoards = usePuzzleStore((state) => state.completedBoards);
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const [viewMode, setViewMode] = useState<ViewMode>("threeDimensions");
  const [isLayerView, setIsLayerView] = useState<boolean>(false);
  const [sudokuMap, setSudokuMap] = useState<number[][]>([]);
  const [positionOfEmptyCell, setPositionOfEmptyCell] = useState<number[][]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTheme(theme);
    setSudokuMap(answerSudoku[8 - currentLayer]);
    setPositionOfEmptyCell(emptyCellPosition[8 - currentLayer]);

    if (completedBoards[currentLayer]) {
      setIsModalVisible(true);
    }
  }, [answerSudoku, emptyCellPosition, currentLayer, completedBoards, setTheme, theme]);

  const getCubeBoard = useCallback(() => {
    const isEmpty = (layer: number, rowIndex: number, colIndex: number): boolean => {
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
    setViewMode((prevMode) =>
      prevMode === "threeDimensions" ? "twoDimensions" : "threeDimensions"
    );
  };

  const handleGoHomePage = () => {
    navigate("/", { replace: true });
  };

  const switchTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
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
            <Modal
              isOpen={isModalVisible}
              closeModal={() => setIsModalVisible(false)}
              handleGoCubeBoard={() => setViewMode("threeDimensions")}
              numOfCompleted={completedBoards.reduce(
                (count, value) => (value === true ? count + 1 : count),
                0
              )}
            />
          </div>
        )}
      </div>
      <div className="fixed bottom-3 left-1/2 box-content flex h-14 -translate-x-1/2 gap-3 rounded-md bg-gray-200 p-2.5 px-5 dark:bg-stone-700">
        <OutlineButton text="홈" onClick={handleGoHomePage} size="S" />
        <OutlineButton text="테마 변경" onClick={switchTheme} size="S" />
        <BackgroundSound />
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
