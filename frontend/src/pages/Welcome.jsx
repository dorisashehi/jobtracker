import { Link } from "react-router-dom";
const Welcome = () => {
  return (
    <div className="container-main justify-center bg-[#f5f7f9]">
      <div className="content">
        <div className="welcome-container">
          <h1 className="welcome-header">Simplify Your Job Search</h1>
          <div className="welcome-description">
            <p>
              A user-friendly web application designed to help you effortlessly
              track your job applications.
            </p>
            <p>
              {
                "Job hunting doesn't have to be stressful—let's make it simpler together."
              }
            </p>
          </div>
          <Link to="/login" className="getStarted-btn mt-5" aria-current="page">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
