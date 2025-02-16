import React from "react";
import { Navbar } from "../components/component";
import { Outlet, useLocation } from "react-router-dom";
import SplashCursor from "../components/Animated/SplashCursor ";

const Layout = () => {
  const location = useLocation();

  const hideNavbar = location.pathname === "/auth/signin" || location.pathname === "/auth/signup" || location.pathname === "/auth";

  return (
    <>
      <div className="w-full bg-[#f3f3f3]">
        {/* <SplashCursor /> */}
        {hideNavbar ? null : <Navbar />}
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
