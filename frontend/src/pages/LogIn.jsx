import { Link } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import Auth from "../services/Auth";
import Spinner from "../components/Spiner";
import ApplicationsAPI from "../services/ApplicationsAPI";
import LoginLinks from "../components/LoginLinks";

const LogIn = ({ setUserAuth }) => {
  const [loading, setLoading] = useState(false);

  //const { fetchUser } = useContext(AuthenticatedContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  // Validation function on each input change
  const validate = (name, value) => {
    let newErrors = { ...errors };
    let valid = true;

    // Email validation
    if (name === "email") {
      if (!value) {
        newErrors.email = "Email is required.";
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = "Please enter a valid email address.";
        valid = false;
      } else {
        newErrors.email = "";
      }
    }

    // Password validation
    if (name === "password") {
      if (!value) {
        newErrors.password = "Password is required.";
        valid = false;
      } else if (value.length < 8) {
        newErrors.password = "Password must be at least 8 characters.";
        valid = false;
      } else if (!/[A-Z]/.test(value)) {
        newErrors.password =
          "Password must contain at least one uppercase letter.";
        valid = false;
      } else if (!/[0-9]/.test(value)) {
        newErrors.password = "Password must contain at least one number.";
        valid = false;
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        newErrors.password =
          "Password must contain at least one special character.";
        valid = false;
      } else {
        newErrors.password = "";
      }
    }

    // Update errors state
    setErrors(newErrors);

    return valid;
  };

  // Handle input changes and validate on change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    // Trigger validation immediately when input changes
    validate(name, value);
  };

  const submitAction = async (e) => {
    e.preventDefault();
    setLoading(true);

    //submit form signup
    if (validate("email", user.email) && validate("password", user.password)) {
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      };
      try {
        const data = await Auth.setUserLoggIn(options);

        if (data.success) {
          setUserAuth(data.user);
          const results = await ApplicationsAPI.getApplByUser(data.user.id);
          if (results.length > 0) {
            //setApplications(results);
            setLoading(false);
          }
        }
        if (data.error) {
          //error accoured during login
          setErrors({ ...errors, submission_error: data.error });
        }
        //}, 500);
      } catch (error) {
        console.log(error);
        setErrors({ ...errors, submission_error: "Login Failed" });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };
  return (
    <div className="container-main justify-center flex items-center bg-[#f5f7f9]">
      <div className="content">
        <div className="flex justify-center flex-col text-center">
          <div>
            <h1 className="text-[20px] mb-[5px] text-primaryGreen font-bold">
              JBtracker
            </h1>
            <div className="text-secondaryText text-[14px] mb-10">
              Welcome back! Please log in to continue.
            </div>
          </div>
          <div className="login-container items-center flex flex-col mx-auto my-auto">
            <>
              <h1 className="general-header">Log In</h1>
              <form className="login-form">
                <div className="login-input-container relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill="#a7abaf"
                    className="absolute top-[10px] left-3 icon-style-small"
                  >
                    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                  </svg>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="login-input"
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.email && (
                    <em className="err-message">{errors.email}</em>
                  )}
                </div>
                <div className="login-input-container relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill="#a7abaf"
                    className="absolute top-[10px] left-3 icon-style-small"
                  >
                    <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
                  </svg>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    className="login-input"
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.password && (
                    <em className="err-message">{errors.password}</em>
                  )}
                </div>
                <div className="login-input-container">
                  <button
                    type="submit"
                    className="main-btn float-right mt-0 login-btn"
                    onClick={(e) => submitAction(e)}
                  >
                    Log In {loading && <Spinner style="w-fit ml-1" />}
                  </button>
                </div>
                {/* Divider */}
                <div className="relative mb-[20px]">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">or</span>
                  </div>
                </div>

                <Link
                  to="http://localhost:3000/auth/google"
                  className="login-google-btn"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Login with Google
                </Link>
                <LoginLinks url="/signup" title="Sign up now!">
                  {"Don't have an account?  "}
                </LoginLinks>
                {errors.submission_error && (
                  <em className="err-message">{errors.submission_error}</em>
                )}
              </form>
            </>

            <br />
          </div>
        </div>
      </div>
    </div>
  );
};
LogIn.propTypes = {
  setUserAuth: PropTypes.func.isRequired,
  //setApplications: PropTypes.func.isRequired,
};
export default LogIn;
