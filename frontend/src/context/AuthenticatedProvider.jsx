import { AuthenticatedContext } from "./AuthenticatedContext";
import { useState } from "react";
import propTypes from "prop-types";
import Auth from "../services/Auth";

const AuthenticatedProvider = ({ children }) => {
  const [loading, setLoading] = useState(true); // Tracks whether authentication is being fetched
  const [userAuth, setUserAuth] = useState(null);

  const getUser = async () => {
    try {
      const response = await Auth.getLoggedInUser();
      if (response.success) {
        setUserAuth(response.user); // Set logged-in user
      } else {
        setUserAuth(null); // Set null if no user is found
      }
    } catch (error) {
      console.error("Error while fetching user:", error);
      setUserAuth(null); // Set null on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthenticatedContext.Provider
      value={{ userAuth, loading, setUserAuth, getUser }}
    >
      {children}
    </AuthenticatedContext.Provider>
  );
};

AuthenticatedProvider.propTypes = {
  children: propTypes.node,
};
export default AuthenticatedProvider;
