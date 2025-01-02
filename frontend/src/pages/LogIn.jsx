const LogIn = () => {
  return (
    <div className="container-main justify-center bg-[#f5f7f9]">
      <div className="content">
        <div className="login-container">
          <h1 className="general-header">Log In</h1>
          <form className="login-form">
            <div className="login-input-container">
              <label htmlFor="username" className="login-label">
                Username
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
                Email
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
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="login-input"
              />
            </div>
            <button type="submit" className="main-btn float-right mt-0">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LogIn;
