import React from "react";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <>
      <div className="flex justify-center items-center text-4xl">MainPage</div>
      <Outlet />
    </>
  );
};

export default MainPage;
