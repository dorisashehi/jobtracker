import { Link } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import Auth from "../services/Auth";
import Spinner from "../components/Spiner";
import ApplicationsAPI from "../services/ApplicationsAPI";

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
                <div className="login-input-container">
                  <p className="text-secondaryText text-[12px]">
                    {"Don't have an account?  "}
                    <Link to="/signup" className="text-primaryGreen">
                      <b>Sign up now!</b>
                    </Link>
                  </p>
                </div>
                {errors.submission_error && (
                  <em className="err-message">{errors.submission_error}</em>
                )}
              </form>
            </>

            <br />
            {/* <a href="http://localhost:3000/auth/google">Login WIth Google</a> */}
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
