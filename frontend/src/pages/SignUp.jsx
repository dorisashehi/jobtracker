import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spiner";
import Auth from "../services/Auth";
import LoginLinks from "../components/LoginLinks";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validate = (name, value) => {
    let newErrors = { ...errors };
    let valid = true;

    if (name === "username") {
      if (!value) {
        newErrors.username = "Username is required.";
        valid = false;
      } else {
        newErrors.username = "";
      }
    }

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

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    //handle form inputs change
    setUser({ ...user, [name]: value });

    validate(name, value);
  };

  const submitAction = async (e) => {
    e.preventDefault();
    if (
      validate("username", user.username) &&
      validate("email", user.email) &&
      validate("password", user.password)
    ) {
      //submit form signup
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      };
      const data = await Auth.signUpUser(options);

      setTimeout(() => {
        setLoading(false);
        if (data.error) {
          setErrors({ submission_error: data.error });
          return;
        }
        if (data.success) {
          navigate("/login");
        }
      }, 500);
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
              Welcome back! Please sign up to continue.
            </div>
          </div>
          <div className="login-container items-center flex flex-col mx-auto my-auto">
            <h1 className="general-header">Sign Up</h1>
            <form className="login-form">
              <div className="login-input-container relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  fill="#a7abaf"
                  className="absolute top-[10px] left-3 icon-style-small"
                >
                  <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
                </svg>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  className="login-input"
                  onChange={(e) => handleChange(e)}
                />
                {errors.username && (
                  <em className="err-message">{errors.username}</em>
                )}
              </div>

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
              <LoginLinks url="/login" title="Log in now!">
                {"Already have an account?  "}
              </LoginLinks>
              {errors.submission_error && (
                <em className="err-message">{errors.submission_error}</em>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
