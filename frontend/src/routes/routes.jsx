import Layout from "../components/Layout";
import Welcome from "../pages/Welcome";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
const routes = [
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Welcome /> },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
];

export default routes;
