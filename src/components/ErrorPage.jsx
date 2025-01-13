import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  const handleGoHomePage = () => {
    navigate("/");
  };

  return (
    <div className="mx-auto grid h-screen place-items-center px-8 text-center">
      <div>
        <p className="mb-14 mt-10 text-3xl font-bold md:text-4xl">Not Found</p>
        <button
          className="w-full rounded-md bg-black p-3 text-white md:w-[8rem]"
          onClick={handleGoHomePage}
        >
          홈으로 이동
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
