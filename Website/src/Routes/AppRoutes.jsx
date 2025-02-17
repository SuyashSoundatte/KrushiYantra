import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage, LandigPage, AuthPage } from "../Pages/pages";
import Layout from "../Layout/Layout";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import Farmer from "../Pages/Main/Farmer";
import Buyer from "../Pages/Main/Buyer";
const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public Routes */}
          <Route path="/" element={<LandigPage />} />
          <Route path="/auth" element={<AuthPage />} > 
            <Route path="signup" element={<AuthPage />} />
            <Route path="signin" element={<AuthPage />} />
          </Route>
          <Route path="*" element={<h1 className="text-red-500">404</h1>} />

          {/* private routes */}
          <Route path="/main-page" element={<MainPage />}>
            <Route
              path="farmer"
              element={<Farmer />}
            />
            <Route
              path="buyer"
              element={<Buyer />}
            />
          </Route>
        </Route>
      </Routes>
  );
};

export default AppRoutes;
