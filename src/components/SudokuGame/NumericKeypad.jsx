import PropTypes from "prop-types";
import usePuzzleStore from "../../store/usePuzzleStore";
import useUserStore from "../../store/useUserStore";

function NumericKeypad({ handleLayerView }) {
  const numbersOfPad = Array(9)
    .fill(0)
    .map((_, i) => i + 1);
  const currentCell = usePuzzleStore((state) => state.currentCell);
  const setViewMode = usePuzzleStore((state) => state.setViewMode);
  const currentLayer = usePuzzleStore((state) => state.currentLayer);
  const updateUserInputValue = useUserStore((state) => state.updateUserInputValue);
  const viewMode = usePuzzleStore((state) => state.viewMode);

  const handleSelectedNumber = (number) => {
    updateUserInputValue(8 - currentLayer, currentCell.row, currentCell.col, number);
  };

  const handleViewMode = () => {
    setViewMode();
  };

  return (
    <div className="h-80 w-56">
      <div className="mb-3 grid grid-cols-2 gap-3">
        <button
          className="mb-3 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
          onClick={handleViewMode}
        >
          뷰 전환
        </button>
        <button
          className="mb-3 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
          onClick={handleLayerView}
        >
          펼쳐보기
        </button>
      </div>
      {viewMode === "twoDimensions" && (
        <>
          <div className="mb-3 grid grid-cols-2 gap-3">
            <button className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700">
              메모
            </button>
            <button className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700">
              삭제
            </button>
          </div>
          <div className="grid grid-cols-3 grid-rows-3 gap-3 text-center">
            {numbersOfPad.map((number) => (
              <div
                key={number}
                className="h-16 w-16 cursor-pointer rounded-md border py-3 font-Pretendard text-3xl font-extrabold"
                onClick={() => handleSelectedNumber(number)}
              >
                {number}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

NumericKeypad.propTypes = {
  handleLayerView: PropTypes.func.isRequired,
};

export default NumericKeypad;
