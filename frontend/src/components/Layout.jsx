import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import AuthenticatedProvider from "../context/AuthenticatedProvider";

const Layout = () => {
  return (
    <>
      <AuthenticatedProvider>
        <Navigation />
        <Outlet />
        <Footer />
      </AuthenticatedProvider>
    </>
  );
};

export default Layout;
