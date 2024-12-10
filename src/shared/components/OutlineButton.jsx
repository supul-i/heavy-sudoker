import PropTypes from "prop-types";

function OutlineButton({ text }) {
  return (
    <button className="rounded-xl rounded-b-2xl border border-x-4 border-b-8 border-t-4 border-black px-7 py-3.5 text-3xl font-extrabold">
      {text}
    </button>
  );
}

OutlineButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default OutlineButton;
