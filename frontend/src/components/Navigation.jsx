import { Link } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

const Navigation = ({ userAuth, setUserAuth }) => {
  //const { isAuthenticated, fetchUser } = useContext(AuthenticatedContext);
  const [setSubmitActionError] = useState({ error: "" });

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
      const response = await fetch(
        "http://localhost:3000/auth/user/logout",
        options
      );

      if (response.ok) {
        setTimeout(() => {
          setUserAuth(null);
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
      <nav className="navigation-container">
        <div className="navigation-content content">
          <div className={`col-logo ${userAuth ? "lg:w-[10%]" : "lg:w-[20%]"}`}>
            {/* JBtracker {userAuth?.name} */}
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
          {userAuth && (
            <ul
              className={`col-navigation-menu ${
                userAuth ? "lg:w-[40%] " : "lg:w-[0%]"
              }`}
            >
              <li>
                <Link
                  to="/dashboard"
                  className="font-semibold text-[#374151] hover:opacity-[0.8] text-[14px]"
                  aria-current="page"
                >
                  Dashboard{userAuth.name}
                </Link>
              </li>
              <li>
                <Link
                  to="/applications"
                  className="font-semibold text-[#374151] hover:opacity-[0.8] text-[14px]"
                  aria-current="page"
                >
                  Applications
                </Link>
              </li>
            </ul>
          )}

          <ul className={`col-links ${userAuth ? "lg:w-[50%]" : "lg:w-[80%]"}`}>
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
