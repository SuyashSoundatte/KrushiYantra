import React from "react";
import { Navbar } from "../components/component";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  const hideNavbar = location.pathname === "/main-page/buyer";

  return (
    <>
      <div className="w-full bg-[#f3f3f3]">
        {hideNavbar ? null : <Navbar />}
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
