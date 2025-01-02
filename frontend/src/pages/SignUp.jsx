import { Link } from "react-router-dom";
const SignIn = () => {
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
              />
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
              />
            </div>
            <div className="login-input-container">
              <em className="text-secondaryText text-[12px]">
                {"Don't have an account?  "}
                <Link to="/login" className="text-redText">
                  <b>Login here</b>
                </Link>
              </em>
            </div>
            <button type="submit" className="main-btn float-right mt-0">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
