import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
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
      const response = await fetch(
        "http://localhost:3000/auth/users/signup",
        options
      );
      const data = await response.json();

      if (data.error) {
        setErrors({ submission_error: data.error });
        return;
      }
      if (data.success) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="container-main justify-center bg-[#f5f7f9]">
      <div className="content">
        <div className="login-container">
          <h1 className="general-header">Sign Up</h1>
          <form className="login-form">
            <div className="login-input-container">
              <label htmlFor="username" className="login-label">
                Username<em className="text-redText">*</em>
              </label>
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
              {errors.email && <em className="err-message">{errors.email}</em>}
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
                <Link to="/login" className="text-redText">
                  <b>Login here</b>
                </Link>
              </em>
            </div>
            {submitAction.error !== "" && (
              <div className="login-input-container">
                <p className="text-redText">{errors.submission_error}</p>
              </div>
            )}
            {errors.submission_error && (
              <em className="err-message">{errors.submission_error}</em>
            )}
            <button
              type="submit"
              className="main-btn float-right mt-0"
              onClick={(e) => submitAction(e)}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
