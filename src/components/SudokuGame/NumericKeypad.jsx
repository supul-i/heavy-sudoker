function NumericKeypad() {
  const numbersOfPad = Array(9)
    .fill(0)
    .map((_, i) => i + 1);

  return (
    <div className="h-80 w-56">
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
          >
            {number}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NumericKeypad;
