function LoadingDots() {
  return (
    <div className="flex w-[1200px] items-center justify-center space-x-2 bg-white">
      <div className="h-10 w-10 flex-none animate-bounce rounded-full bg-slate-900 [animation-delay:-0.6s]"></div>
      <div className="h-10 w-10 flex-none animate-bounce rounded-full bg-slate-900 [animation-delay:-0.3s]"></div>
      <div className="h-10 w-10 flex-none animate-bounce rounded-full bg-slate-900 [animation-delay:-0.15s]"></div>
      <div className="h-10 w-10 flex-none animate-bounce rounded-full bg-slate-900"></div>
    </div>
  );
}

export default LoadingDots;
