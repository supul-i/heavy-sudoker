import usePuzzleStore from "../../store/usePuzzleStore";
import useUserStore from "../../store/useUserStore";
import { playClickKeyPadSound } from "../../utils/audio";

function NumericKeypad() {
  const numbersOfPad = Array(9)
    .fill(0)
    .map((_, i) => i + 1);
  const currentCell = usePuzzleStore((state) => state.currentCell);
  const currentLayer = usePuzzleStore((state) => state.currentLayer);
  const updateUserInputValue = useUserStore((state) => state.updateUserInputValue);
  const resetSudoku = useUserStore((state) => state.resetLayerUserHistory);

  const handleSelectedNumber = (number) => {
    playClickKeyPadSound();

    if (number) {
      updateUserInputValue(8 - currentLayer, currentCell.row, currentCell.col, number);
    } else {
      updateUserInputValue(8 - currentLayer, currentCell.row, currentCell.col, null);
    }
  };

  return (
    <div className="h-80 w-56">
      <div className="mb-3 grid grid-cols-2 gap-3">
        <button
          onClick={() => resetSudoku(8 - currentLayer)}
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
        >
          초기화
        </button>
        <button
          onClick={() => handleSelectedNumber(null)}
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
        >
          삭제
        </button>
      </div>
      <div className="grid grid-cols-3 grid-rows-3 gap-3 text-center">
        {numbersOfPad.map((number) => (
          <div
            key={number}
            className="h-16 w-16 cursor-pointer rounded-md border bg-white py-3 font-Pretendard text-3xl font-extrabold hover:bg-cyan-200 dark:border-2 dark:border-cyan-700"
            onClick={() => handleSelectedNumber(number)}
          >
            {number}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NumericKeypad;
