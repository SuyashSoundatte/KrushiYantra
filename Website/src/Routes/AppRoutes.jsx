import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage, LandigPage, AuthPage } from "../Pages/pages";
import Layout from "../Layout/Layout";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import Farmer from "../Pages/Main/Farmer";
import Buyer from "../Pages/Main/Buyer";
import Climate from "../components/bots/Climate";

// // Bot Components
// import ClimateBot from "../Pages/Bots/ClimateBot";
// import DiseaseBot from "../Pages/Bots/DiseaseBot";
// import RecommendationBot from "../Pages/Bots/RecommendationBot";
// import VoiceAssist from "../Pages/Bots/VoiceAssist";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<LandigPage />} />
        
        {/* Auth Routes */}
        <Route path="auth" element={<AuthPage />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
        </Route>

        {/* Main Application Routes */}
        <Route path="main-page" element={<MainPage />}>
          {/* Farmer Routes */}
          <Route path="farmer">
            <Route index element={<Farmer />} />
              <Route path="climate-bot" element={<Climate />} />
              <Route path="disease-bot" element={<h1>Disease Bot</h1>} />
              <Route path="recommendation-bot" element={<h1>Recommendation Bot</h1>} />
              <Route path="voice-assist" element={<h1>Voice Assist</h1>} /> 
          </Route>

          {/* Buyer Routes */}
          <Route path="buyer" element={<Buyer />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={
          <div className="flex items-center justify-center h-screen">
            <h1 className="text-3xl font-bold text-red-500">404 - Page Not Found</h1>
          </div>
        } />
      </Route>
    </Routes>
  );
};

export default AppRoutes;