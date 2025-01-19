import PropTypes from "prop-types";

const Header = ({ title, desc, children }) => {
  return (
    <div className="flex-1">
      <div className="flex flex-col">
        <div className="header-w-text">
          <div className="p-2 bg-green-100 rounded-lg">{children}</div>

          <h1 className="header-main">{title}</h1>
        </div>
        <p className="header-text-desc mt-2">{desc}</p>
      </div>
    </div>
  );
};

Header.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  desc: PropTypes.string,
};
export default Header;
