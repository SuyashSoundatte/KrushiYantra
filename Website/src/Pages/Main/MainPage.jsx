import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const MainPage = () => {
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  useEffect(() =>{
    if(!isLoggedIn){
      navigate("/")
    }
  },[isLoggedIn, navigate])

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
    <div className= "pt-26 xl:pt-26">
      <Outlet />
    </div>
  );
};

export default MainPage;
