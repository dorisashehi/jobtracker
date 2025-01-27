import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Layout from "./components/Layout";
import Welcome from "./pages/Welcome";
import { useRoutes } from "react-router-dom";
import { useState, useEffect } from "react";
import Auth from "./services/Auth";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
// import ApplicationsAPI from "./services/ApplicationsAPI";
import Spiner from "./components/Spiner";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  const [userAuth, setUserAuth] = useState(null);
  //const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true); // Tracks whether authentication is being fetched

  useEffect(() => {
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

    if (userAuth == null) {
      setTimeout(() => {
        setLoading(false);
      }, 800);
    }
    getUser();
  }, []);

  if (loading) {
    return <Spiner />;
  }

  return (
    <Router>
      <Navigation userAuth={userAuth} setUserAuth={setUserAuth} />
      <Routes>
        <Route
          path="/"
          element={
            !userAuth ? (
              <Navigate to="/login" setUserAuth={setUserAuth} />
            ) : (
              <Navigate to="/dashboard" userAuth={userAuth} />
            )
          }
        />
        <Route
          path="/login"
          element={
            !userAuth ? (
              <LogIn setUserAuth={setUserAuth} />
            ) : (
              <Navigate to="/dashboard" userAuth={userAuth} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !userAuth ? (
              <SignUp userAuth={userAuth} />
            ) : (
              <Navigate to="/login" setUserAuth={setUserAuth} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            userAuth ? (
              <Dashboard userAuth={userAuth} />
            ) : (
              <Navigate to="/login" setUserAuth={setUserAuth} />
            )
          }
        />

        <Route
          path="/applications"
          element={
            userAuth ? (
              <Applications userAuth={userAuth} />
            ) : (
              <Navigate to="/login" setUserAuth={setUserAuth} />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
