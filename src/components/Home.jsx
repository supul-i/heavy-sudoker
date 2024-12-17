import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PUZZLE_SIZE } from "../constants/puzzle";
import OutlineButton from "../shared/components/OutlineButton";
import usePuzzleStore from "../store/usePuzzleStore";
import useUserStore from "../store/useUserStore";
import getEmptyCellsIndex from "../utils/getEmptyCellsIndex";
import setSudoku from "../utils/setSudoku";

function Home() {
  const navigate = useNavigate();
  const setAnswerSudoku = usePuzzleStore((state) => state.setAnswerSudoku);
  const setEmptyCellPosition = usePuzzleStore((state) => state.setEmptyCellPosition);
  const resetPuzzle = usePuzzleStore((state) => state.resetPuzzle);
  const resetUserHistory = useUserStore((state) => state.resetUserHistory);

  useEffect(() => {
    resetPuzzle();
    resetUserHistory();
  }, [resetPuzzle, resetUserHistory]);

    const sudokuMap = Array(PUZZLE_SIZE)
      .fill()
      .map(() => setSudoku());
    setAnswerSudoku(sudokuMap);

    const emptyCellPosition = Array(PUZZLE_SIZE)
      .fill()
      .map(() => getEmptyCellsIndex(difficultyLevel));

    setEmptyCellPosition(emptyCellPosition);

    navigate("/sudoku");
  };

  useEffect(() => {
    resetPuzzle();
    resetUserHistory();
  }, [resetPuzzle, resetUserHistory]);

  return (
    <div className="h-screen px-4 dark:bg-black">
      <div className="relative flex items-center justify-between pt-6 text-sm font-semibold leading-6 text-slate-700 lg:pt-8 dark:text-slate-200"></div>
      <div className="mx-auto max-w-5xl pt-60">
        <span className="flex flex-col text-center font-tenada text-4xl font-extrabold text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
          HEAVY SUDOKER
        </span>
        <div className="mt-24 flex justify-center space-x-8 font-Pretendard">
          <OutlineButton onClick={() => playSudoku("easy")} text="쉬움" />
          <OutlineButton onClick={() => playSudoku("normal")} text="보통" />
          <OutlineButton onClick={() => playSudoku("hard")} text="어려움" />
        </div>
      </div>
    </div>
  );
}

export default Home;
