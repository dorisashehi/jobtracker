import Loading from "../assets/images/spinner.gif";
import PropTypes from "prop-types";

const Spiner = ({ fullScreen = false, size = "16px", style }) => {
  return (
    <div
      className={`${
        fullScreen ? "fixed inset-0 bg-white bg-opacity-75 flex" : style
      }`}
    >
      <img
        src={Loading}
        alt="Loading..."
        style={{ width: size, height: size }}
        className={"m-auto"}
      />
    </div>
  );
};

Spiner.propTypes = {
  fullScreen: PropTypes.bool,
  style: PropTypes.string,
  size: PropTypes.number,
};

export default Spiner;
