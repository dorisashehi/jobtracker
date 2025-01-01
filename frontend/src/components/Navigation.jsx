import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <nav className="navigation-container">
        <div className="navigation-content content">
          <div className="col-logo">JBtracker</div>
          <ul className="col-links">
            <li className="">
              <Link to="/" className="menu-item" aria-current="page">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
