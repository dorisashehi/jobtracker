import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Layout from "./components/Layout";
import Welcome from "./pages/Welcome";
import { useRoutes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
function App() {
  const [userAuth, setUserAuth] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/login/success`, {
          credentials: "include",
        });
        if (response.ok) {
          const json = await response.json();

          setUserAuth(json.user);
        }
      } catch (error) {
        console.error(error);
        setUserAuth({});
      }
    };
    getUser();
  }, []);
  const routes = useRoutes([
    {
      path: "",
      element: <Layout userAuth={userAuth} setUserAuth={setUserAuth} />,
      children: [
        { index: true, element: <Welcome /> },
        {
          path: "login",
          element:
            userAuth && userAuth.id ? (
              <Dashboard userAuth={userAuth} />
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

  return routes;
}

export default App;
