import React from "react";
import AppRoutes from "./Routes/AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import LocomotiveScroll from 'locomotive-scroll';



const App = () => {
  const locomotiveScroll = new LocomotiveScroll();
  return (
    <div className="">
      <Router>
        <RecoilRoot>
          <AppRoutes />
        </RecoilRoot>
      </Router>
    </div>
  );
};

export default App;
