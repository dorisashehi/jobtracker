import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import AuthenticatedProvider from "../context/AuthenticatedProvider";
import PropTypes from "prop-types";

const Layout = ({ userAuth, setUserAuth }) => {
  return (
    <>
      <AuthenticatedProvider>
        <Navigation userAuth={userAuth} setUserAuth={setUserAuth} />
        <Outlet />
        <Footer />
      </AuthenticatedProvider>
    </>
  );
};

Layout.propTypes = {
  userAuth: PropTypes.object.isRequired,
  setUserAuth: PropTypes.func.isRequired,
};

export default Layout;
