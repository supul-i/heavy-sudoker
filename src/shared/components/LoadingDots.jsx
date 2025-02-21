function LoadingDots() {
  return (
    <div className="flex justify-center space-x-2">
      <div className="h-10 w-10 flex-none animate-bounce rounded-full bg-slate-900 [animation-delay:-0.6s] dark:bg-white"></div>
      <div className="h-10 w-10 flex-none animate-bounce rounded-full bg-slate-900 [animation-delay:-0.3s] dark:bg-white"></div>
      <div className="h-10 w-10 flex-none animate-bounce rounded-full bg-slate-900 [animation-delay:-0.15s] dark:bg-white"></div>
      <div className="h-10 w-10 flex-none animate-bounce rounded-full bg-slate-900 dark:bg-white"></div>
    </div>
  );
}

export default LoadingDots;
