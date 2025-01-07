import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthenticatedContext } from "../context/AuthenticatedContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navigation = () => {
  const { isAuthenticated, fetchUser } = useContext(AuthenticatedContext);
  const [submitActionError, setSubmitActionError] = useState({ error: "" });
  let navigate = useNavigate();

  const handleLogout = async () => {
    //submit form signup
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
      console.log(response.data);
      fetchUser();
      navigate("/login");
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
          <div
            className={`col-logo ${
              isAuthenticated ? "lg:w-[10%]" : "lg:w-[20%]"
            }`}
          >
            JBtracker {isAuthenticated}
          </div>
          {isAuthenticated && (
            <ul
              className={`col-navigation-menu ${
                isAuthenticated ? "lg:w-[40%] " : "lg:w-[0%]"
              }`}
            >
              <li>
                <Link to="/dashboard" className="" aria-current="page">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/applications" className="" aria-current="page">
                  Applications
                </Link>
              </li>
            </ul>
          )}

          <ul
            className={`col-links ${
              isAuthenticated ? "lg:w-[50%]" : "lg:w-[80%]"
            }`}
          >
            {!isAuthenticated && (
              <li className="">
                <Link to="/login" className="" aria-current="page">
                  Login
                </Link>
              </li>
            )}
            {isAuthenticated && (
              <li className="">
                <Link
                  to="/login"
                  className=""
                  aria-current="page"
                  onClick={() => handleLogout()}
                >
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

export default Navigation;
