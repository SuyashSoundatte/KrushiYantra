import React from 'react'
import { useLocation } from "react-router-dom";
import SignUp from "../../components/SignUp";
import SignIn from "../../components/SignIn";

const AuthPage = () => {
  const location = useLocation();
  const locationPath = location.pathname;
  return (
    <div>
      {locationPath === "/auth/signup" ? <SignUp /> : <SignIn />}
    </div>
  )
}

export default AuthPage