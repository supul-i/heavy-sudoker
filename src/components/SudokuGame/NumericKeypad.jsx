import usePuzzleStore from "../../store/usePuzzleStore";
import useUserStore from "../../store/useUserStore";

function NumericKeypad() {
  const numbersOfPad = Array(9)
    .fill(0)
    .map((_, i) => i + 1);
  const currentCell = usePuzzleStore((state) => state.currentCell);
  const currentLayer = usePuzzleStore((state) => state.currentLayer);
  const updateUserInputValue = useUserStore((state) => state.updateUserInputValue);

  const handleSelectedNumber = (number) => {
    updateUserInputValue(8 - currentLayer, currentCell.row, currentCell.col, number);
  };

  return (
    <div className="h-80 w-56">
      <div className="grid grid-cols-3 grid-rows-3 gap-3 text-center">
        {numbersOfPad.map((number) => (
          <div
            key={number}
            className="h-16 w-16 cursor-pointer rounded-md border py-3 font-Pretendard text-3xl font-extrabold hover:bg-cyan-200"
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
