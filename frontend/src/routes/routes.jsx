import Layout from "../components/Layout";
import Welcome from "../pages/Welcome";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";

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
        path: "SignUp",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
