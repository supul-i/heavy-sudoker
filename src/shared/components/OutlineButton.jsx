import PropTypes from "prop-types";

function OutlineButton({ onClick = () => {}, text }) {
  return (
    <button
      className="rounded-xl rounded-b-2xl border border-x-4 border-b-8 border-t-4 border-black px-7 py-3.5 text-3xl font-extrabold dark:border-white dark:text-white"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

OutlineButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default OutlineButton;
