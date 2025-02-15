import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "../Pages/pages";
import Layout from "../Layout/Layout";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public Routes */}
          <Route path="/" element={<h1>Landing</h1>} />
          <Route path="*" element={<h1 className="text-red-500">404</h1>} />

          {/* private routes */}
          <Route path="/main-page" element={<MainPage />}>
            <Route
              path="farmer"
              element={<h1 className="text-4xl">Farmer Main Page</h1>}
            />
            <Route
              path="buyer"
              element={<h1 className="text-4xl">Buyer Main Page</h1>}
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
