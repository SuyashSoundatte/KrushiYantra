import React from "react";
import AppRoutes from "./Routes/AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <div className="bg-[#f3f3f3] h-screen">
      <Router>
        <RecoilRoot>
          <AppRoutes />
        </RecoilRoot>
      </Router>
    </div>
  );
};

export default App;
