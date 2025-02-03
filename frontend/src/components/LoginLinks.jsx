import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const LoginLinks = ({ children, url, title }) => {
  return (
    <>
      <div className="login-input-container">
        <p className="text-secondaryText text-[12px] text-center">
          {children}
          <Link to={url} className="text-primaryGreen">
            <b>{title}</b>
          </Link>
        </p>
      </div>
    </>
  );
};
LoginLinks.propTypes = {
  children: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
export default LoginLinks;
