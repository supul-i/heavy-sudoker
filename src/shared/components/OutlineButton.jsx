import PropTypes from "prop-types";

const OUTLINE_BUTTON_SIZE = {
  S: "rounded-b-xl px-5 py-1.5 text-xl",
  M: "rounded-b-2xl px-6 py-2.5 text-2xl",
  L: "rounded-b-2xl px-7 py-3.5 text-3xl",
};

function OutlineButton({ text, onClick, size = "L" }) {
  return (
    <button
      className={`${OUTLINE_BUTTON_SIZE[size]} trasition-all rounded-xl rounded-b-2xl border border-x-4 border-b-8 border-t-4 border-black bg-white font-extrabold hover:scale-110 active:scale-105 dark:border-white dark:bg-black dark:text-white`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

OutlineButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.string,
};

export default OutlineButton;
