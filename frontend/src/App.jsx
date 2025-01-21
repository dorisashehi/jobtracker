import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Layout from "./components/Layout";
import Welcome from "./pages/Welcome";
import { useRoutes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Auth from "./services/Auth";

function App() {
  const [userAuth, setUserAuth] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await Auth.getLoggedInUser();
        console.log(response);
        if (response.success) {
          setUserAuth(response.user); // Set logged-in user
        } else {
          setUserAuth(null); // Set null if no user is found
        }
      } catch (error) {
        console.error("Error while fetching user:", error);
        setUserAuth(null); // Set null on error
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    getUser();
  }, []); // Only run once when the component mounts

  const routes = useRoutes([
    //frontend routes
    {
      path: "",
      element: <Layout userAuth={userAuth} setUserAuth={setUserAuth} />,
      children: [
        { index: true, element: <Welcome /> },
        {
          path: "login",
          element:
            userAuth && userAuth.id ? (
              <Navigate to="/dashboard" />
            ) : (
              <LogIn setUserAuth={setUserAuth} />
            ),
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "dashboard",
          element:
            userAuth && Object.keys(userAuth).length > 0 ? (
              <Dashboard userAuth={userAuth} />
            ) : (
              <Navigate to="/login" />
            ),
        },
        {
          path: "applications",
          element:
            userAuth && Object.keys(userAuth).length > 0 ? (
              <Applications userAuth={userAuth} />
            ) : (
              <Navigate to="/login" />
            ),
        },
      ],
    },
  ]);

  // if (loading) {
  //   return;
  // }
  return routes;
}

export default App;
