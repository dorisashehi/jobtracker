import PropTypes from "prop-types";

const Button = ({ title, onClickAct = null, children, className = null }) => {
  return (
    <button
      type="submit"
      onClick={onClickAct}
      className={`main-btn float-right mt-0 ${className}`}
    >
      {children}
      <p className="py-[5px] px-[5px]">{title}</p>
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  onClickAct: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Button;
