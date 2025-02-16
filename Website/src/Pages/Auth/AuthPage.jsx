import React from "react";
import { useLocation } from "react-router-dom";
import SignUp from "../../components/SignUp";
import SignIn from "../../components/SignIn";
import Squares from "../../components/Animated/Squares";

const AuthPage = () => {
  const location = useLocation();
  const locationPath = location.pathname;
  return (
    <div className="w-full min-h-screen">
      <div className="absolute w-full h-screen flex items-center justify-center"
        style={{
          pointerEvents: "none",
        }}
      >
        <Squares
          speed={0.5}
          squareSize={40}
          direction="down" // up, down, left, right, diagonal
          borderColor="#ffffff"
          hoverFillColor="#222"
        />
      </div>
      <div className="w-full absolute top-1/2 left-1/2 -translate-1/2">{locationPath === "/auth/signup" ? <SignUp /> : <SignIn />}</div>
    </div>
  );
};

export default AuthPage;
