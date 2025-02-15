import React from "react";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <>
      <div>MainPage</div>
      <Outlet />
    </>
  );
};

export default MainPage;
