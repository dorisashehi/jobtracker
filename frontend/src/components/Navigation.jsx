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
        "http://localhost:3000/users/logout",
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
            JBtracker {userAuth?.name}
          </div>
          {userAuth && (
            <ul
              className={`col-navigation-menu ${
                userAuth ? "lg:w-[40%] " : "lg:w-[0%]"
              }`}
            >
              <li>
                <Link to="/dashboard" className="" aria-current="page">
                  Dashboard{userAuth.name}
                </Link>
              </li>
              <li>
                <Link to="/applications" className="" aria-current="page">
                  Applications
                </Link>
              </li>
            </ul>
          )}

          <ul className={`col-links ${userAuth ? "lg:w-[50%]" : "lg:w-[80%]"}`}>
            {!userAuth && (
              <li className="">
                <Link to="/login" className="" aria-current="page">
                  Login
                </Link>
              </li>
            )}
            {userAuth && (
              <li className="">
                <Link aria-current="page" onClick={(e) => handleLogout(e)}>
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
