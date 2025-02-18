import React from "react";
import AppRoutes from "./Routes/AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import LocomotiveScroll from "locomotive-scroll";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  const locomotiveScroll = new LocomotiveScroll();
  return (
    <div className="">
      <AuthProvider>
        <Router>
          <RecoilRoot>
            <AppRoutes />
          </RecoilRoot>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
