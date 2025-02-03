import React from "react";
import ReactDOM from "react-dom/client";
//import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
//import { BrowserRouter } from "react-router-dom";
import App from "./App";
//import routes from "./routes/routes";
//const router = createBrowserRouter(routes);
import ApplicationsProvider from "./context/ApplicationsProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApplicationsProvider>
      <App />
    </ApplicationsProvider>
  </React.StrictMode>
);
