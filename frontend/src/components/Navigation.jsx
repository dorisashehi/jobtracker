import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import PropTypes from "prop-types";
import Auth from "../services/Auth";
import { ApplicationsContext } from "../context/ApplicationsContext";

const Navigation = ({ userAuth, setUserAuth }) => {
  const [setSubmitActionError] = useState({ error: "" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setApplications } = useContext(ApplicationsContext);

  const toggleNavbarSticky = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = async (e) => {
    //submit form signup
    e.preventDefault();
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include", //to pass the session cookie too
    };
    try {
      const response = await Auth.setUserLoggedOut(options);

      if (response.ok) {
        setTimeout(() => {
          setUserAuth(null);
          setApplications([]);
        }, 300);
      }
    } catch (error) {
      console.log(error);
      setSubmitActionError({
        error: error.response?.data?.error || "Login Failed",
      });
    }
  };

  return (
    <>
      <nav className="navigation-container ">
        <div className="navigation-content content">
          <div className="col-logo lg:w-[10%]">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 50"
                className="h-8"
              >
                <circle cx="25" cy="25" r="20" fill="#4a9d83" />
                <path
                  d="M15 25 L22 32 L35 19"
                  stroke="white"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text
                  x="55"
                  y="35"
                  fontFamily="Arial"
                  fontSize="24"
                  fontWeight="bold"
                >
                  <tspan fill="#10B981">JB</tspan>
                  <tspan fill="#374151">tracker</tspan>
                </text>
              </svg>
            </Link>
          </div>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <ul
              className={`col-links ${userAuth ? "lg:w-[50%]" : "lg:w-[80%]"}`}
            >
              {!userAuth && (
                <li className="">
                  <Link
                    to="/login"
                    className="flex items-center g-[4px] font-semibold text-[#374151] hover:opacity-[0.8] text-[14px]"
                    aria-current="page"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      fill="#374151"
                      className="icon-style-small"
                    >
                      <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
                    </svg>
                    Login
                  </Link>
                </li>
              )}
              {userAuth && (
                <li className="">
                  <Link
                    aria-current="page"
                    onClick={(e) => handleLogout(e)}
                    className="flex items-center g-[6px] font-semibold  text-[#374151] hover:opacity-[0.8]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      fill="#374151"
                      className="icon-style-small"
                    >
                      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                    </svg>
                    Logout
                  </Link>
                </li>
              )}
            </ul>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="hamburger-menu-button"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => toggleNavbarSticky()}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="#525252"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between md:w-[70%] lg:w-[80%] ${
              !mobileMenuOpen ? "hidden" : ""
            } w-full md:flex md:order-1`}
            id="navbar-sticky"
          >
            <ul className="hamburger-menu">
              {userAuth && (
                <>
                  <li className="submenu-links">
                    <Link
                      to="/dashboard"
                      className="submenu-menu-item"
                      aria-current="page"
                    >
                      Dashboard{userAuth?.name}
                    </Link>
                  </li>
                  <li className="submenu-links">
                    <Link
                      to="/applications"
                      className="submenu-menu-item"
                      aria-current="page"
                    >
                      Applications
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

Navigation.propTypes = {
  userAuth: PropTypes.object,
  setUserAuth: PropTypes.func.isRequired,
};
export default Navigation;
