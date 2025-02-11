import PropTypes from "prop-types";
import { PUZZLE_SIZE } from "../../constants/puzzle";

function Modal({ isOpen, closeModal, handleGoCubeBoard, numOfCompleted }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-80 rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">축하합니다!</h2>
        <p className="text-center">
          {numOfCompleted} / {PUZZLE_SIZE} 성공
        </p>
        <div className="mt-5 gap-3 sm:flex sm:flex-row-reverse">
          <button
            className="inline-flex w-full justify-center rounded-lg bg-slate-800 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700 sm:w-auto"
            onClick={handleGoCubeBoard}
          >
            전체 보기
          </button>
          <button
            className="mt-3 inline-flex w-full justify-center rounded-lg bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200 sm:mt-0 sm:w-auto"
            onClick={closeModal}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleGoCubeBoard: PropTypes.func.isRequired,
  numOfCompleted: PropTypes.number.isRequired,
};

export default Modal;
