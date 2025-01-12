import { AuthenticatedContext } from "./AuthenticatedContext";
import { useState, useEffect } from "react";
import propTypes from "prop-types";

const AuthenticatedProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    };
    try {
      const response = await fetch(
        "http://localhost:3000/users/authuser",
        options
      );
      const data = await response.json();

      if (data.id) {
        setUser(data);
        setIsAuthenticated(true);
      }

      if (data.error) {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <AuthenticatedContext.Provider
      value={{ isAuthenticated, user, fetchUser, setIsAuthenticated, setUser }}
    >
      {children}
    </AuthenticatedContext.Provider>
  );
};

AuthenticatedProvider.propTypes = {
  children: propTypes.node,
};
export default AuthenticatedProvider;
