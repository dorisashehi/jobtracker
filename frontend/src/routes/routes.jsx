import Layout from "../components/Layout";
import Welcome from "../pages/Welcome";
import Dashboard from "../pages/Dashboard";
const routes = [
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Welcome /> },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
];

export default routes;
