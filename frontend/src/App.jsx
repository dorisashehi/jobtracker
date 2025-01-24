import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Layout from "./components/Layout";
import Welcome from "./pages/Welcome";
import { useRoutes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Auth from "./services/Auth";
import ApplicationsAPI from "./services/ApplicationsAPI";

function App() {
  const [userAuth, setUserAuth] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await Auth.getLoggedInUser();
        if (response.success) {
          setUserAuth(response.user); // Set logged-in user
          const results = await ApplicationsAPI.getApplByUser(response.user.id);
          if (results.length > 0) {
            setApplications(results);
          }
        } else {
          setUserAuth(null); // Set null if no user is found
        }
      } catch (error) {
        console.error("Error while fetching user:", error);
        setUserAuth(null); // Set null on error
      }
    };

    // const fetchApplications = async (userId) => {
    //   try {
    //     const results = await ApplicationsAPI.getApplByUser(userId);
    //     if (results.length > 0) {
    //       setApplications(results);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    getUser();
    //.then((userId) => fetchApplications(userId));
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
              <LogIn
                setUserAuth={setUserAuth}
                setApplications={setApplications}
              />
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
              <Dashboard userAuth={userAuth} applications={applications} />
            ) : (
              <Navigate to="/login" />
            ),
        },
        {
          path: "applications",
          element:
            userAuth && Object.keys(userAuth).length > 0 ? (
              <Applications
                userAuth={userAuth}
                applications={applications}
                setApplications={setApplications}
              />
            ) : (
              <Navigate to="/login" />
            ),
        },
      ],
    },
  ]);

  // if (userAuth !== null) {
  //   return <Spinner />;
  // }

  return routes;
}

export default App;
