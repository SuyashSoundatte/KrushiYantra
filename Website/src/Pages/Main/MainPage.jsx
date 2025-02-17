import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const userRole = localStorage.getItem("userRole");

  //   if (userRole === "farmer") {
  //     navigate("/mainpage/farmer");
  //   } else if (userRole === "buyer") {
  //     navigate("/mainpage/buyer");
  //   } else {
  //     navigate("/auth/signin");
  //   }
  // }, [navigate]);

  return (
    <div className= "pt-26 xl:pt-26 h-screen">
      <Outlet />
    </div>
  );
};

export default MainPage;
