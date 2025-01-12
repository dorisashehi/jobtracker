import PropTypes from "prop-types";

const Button = ({ title, onClickAct = null, children }) => {
  return (
    <button
      type="submit"
      onClick={onClickAct}
      className="main-btn float-right mt-0"
    >
      <p>{title}</p>
      {children}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  onClickAct: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
