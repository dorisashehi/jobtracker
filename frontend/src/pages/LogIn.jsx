import { Link } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
// import { AuthenticatedContext } from "../context/AuthenticatedContext";
// import { useContext } from "react";
import Spinner from "../components/Spiner";

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
        const response = await fetch(
          "http://localhost:3000/users/login",
          options
        );
        const data = await response.json();
        //const result = await response.json();
        setTimeout(() => {
          setLoading(false);
          if (data.success) {
            setUserAuth(data.user);
          }
          if (data.error) {
            //error accoured during login
            setErrors({ ...errors, submission_error: data.error });
          }
        }, 500);
      } catch (error) {
        console.log(error);
        setErrors({ ...errors, submission_error: "Login Failed" });
      }
    }
  };
  return (
    <div className="container-main justify-center bg-[#f5f7f9]">
      <div className="content">
        <div className="login-container items-center flex flex-col">
          <>
            <h1 className="general-header">Log In</h1>
            <form className="login-form">
              <div className="login-input-container">
                <label htmlFor="email" className="login-label">
                  Email<em className="text-redText">*</em>
                </label>
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
              <div className="login-input-container">
                <label htmlFor="password" className="login-label">
                  Password<em className="text-redText">*</em>
                </label>
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
                <em className="text-secondaryText text-[12px]">
                  {"Don't have an account?  "}
                  <Link to="/signup" className="text-redText">
                    <b>Sign up now!?</b>
                  </Link>
                </em>
              </div>
              {errors.submission_error && (
                <em className="err-message">{errors.submission_error}</em>
              )}
              <button
                type="submit"
                className="main-btn float-right mt-0"
                onClick={(e) => submitAction(e)}
              >
                Log In {loading && <Spinner />}
              </button>
            </form>
          </>

          <br />
          {/* <a href="http://localhost:3000/auth/google">Login WIth Google</a> */}
        </div>
      </div>
    </div>
  );
};
LogIn.propTypes = {
  setUserAuth: PropTypes.func.isRequired,
};
export default LogIn;
