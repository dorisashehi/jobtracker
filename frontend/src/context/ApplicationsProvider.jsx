import { ApplicationsContext } from "./AuthenticatedContext";
import { useState } from "react";
import ApplicationsAPI from "../services/ApplicationsAPI";
import propTypes from "prop-types";

const ApplicationsProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchApplications = async (userId) => {
    try {
      const results = await ApplicationsAPI.getApplByUser(userId);
      if (results.length > 0) {
        setApplications(results);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ApplicationsContext.Provider
      value={{ fetchApplications, applications, setApplications, loading }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};

ApplicationsProvider.propTypes = {
  children: propTypes.node,
};
export default ApplicationsProvider;
