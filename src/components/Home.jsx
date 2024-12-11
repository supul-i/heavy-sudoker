import OutlineButton from "../shared/components/OutlineButton";

function Home() {
  return (
    <div className="h-screen px-4 dark:bg-black">
      <div className="relative flex items-center justify-between pt-6 text-sm font-semibold leading-6 text-slate-700 lg:pt-8 dark:text-slate-200"></div>
      <div className="mx-auto max-w-5xl pt-60">
        <span className="font-tenada flex flex-col text-center text-4xl font-extrabold text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
          HEAVY SUDOKER
        </span>
        <div className="mt-24 flex justify-center space-x-8 font-Pretendard">
          <OutlineButton text="쉬움" />
          <OutlineButton text="보통" />
          <OutlineButton text="어려움" />
        </div>
      </div>
    </div>
  );
}

export default Home;
