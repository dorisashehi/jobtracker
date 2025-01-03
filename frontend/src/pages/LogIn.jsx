import { Link } from "react-router-dom";
import { useState } from "react";

const LogIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [submitActionError, setSubmitActionError] = useState({ error: "" });

  const handleChange = (e) => {
    //handle form inputs change
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitAction = async (e) => {
    e.preventDefault();
    //submit form signup
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch("http://localhost:3000/users/login", options);
    const result = await response.json();
    console.log(result);
    if (result.error) {
      setSubmitActionError({ error: result.error });
      return;
    }
    //window.location = "/dashboard";
  };
  return (
    <div className="container-main justify-center bg-[#f5f7f9]">
      <div className="content">
        <div className="login-container">
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
            </div>
            <div className="login-input-container">
              <em className="text-secondaryText text-[12px]">
                {"Don't have an account?  "}
                <Link to="/signup" className="text-redText">
                  <b>Sign up now!?</b>
                </Link>
              </em>
            </div>
            {submitAction.error !== "" && (
              <div className="login-input-container">
                <p className="text-redText">{submitActionError.error}</p>
              </div>
            )}

            <button
              type="submit"
              className="main-btn float-right mt-0"
              onClick={(e) => submitAction(e)}
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LogIn;
