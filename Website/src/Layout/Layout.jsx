import React from "react";
import { Navbar } from "../components/component";
import { Outlet, useLocation } from "react-router-dom";
import SplashCursor from "../components/Animated/SplashCursor ";

const Layout = () => {
  const location = useLocation();

  const hideNavbar = location.pathname === "/auth/signin" || location.pathname === "/auth/signup" || location.pathname === "/auth";
  const showNavbar = location.pathname == "/";

  return (
    <>
      <div className="w-full font-['Navbar']">
        {/* <SplashCursor /> */}
        {hideNavbar ? null : <Navbar />}
        {/* {showNavbar ? <Navbar /> : null} */}
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
