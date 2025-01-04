import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [submitActionError, setSubmitActionError] = useState({ error: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let navigate = useNavigate();

  const fetchUser = async () => {
    console.log("fetching user");
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    };
    try {
      const response = await fetch(
        "http://localhost:3000/users/dashboard",
        options
      );
      const data = await response.json();
      console.log(data.error);

      if (data.id) {
        setIsAuthenticated(true);
      }

      if (data.error) {
        setSubmitActionError({ error: data.error });
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

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
      //const result = await response.json();
      navigate("/login");
    } catch (error) {
      setSubmitActionError({
        error: error.response?.data?.error || "Login Failed",
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <div className="container-main justify-center bg-[#f5f7f9]">
        <div className="content">
          {submitActionError.error !== "" && (
            <div className="login-input-container">
              <p className="text-redText">{submitActionError.error}</p>
            </div>
          )}

          {isAuthenticated && (
            <button onClick={() => handleLogout()}>logout</button>
          )}
        </div>
      </div>
    </>
  );
};
export default Dashboard;
