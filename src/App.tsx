import React from "react";
import "@style/reset.scss"; // scss 설정
import { Routes, Route } from "react-router-dom";
import "@style/common.scss";
import HomePage from "./pages/HomePage";
import TravelPage from "@pages/travel/TravelPage";
import TravelSearchPage from "@pages/travel/TravelSearchPage";
import TravelDetailPage from "@pages/travel/TravelDetailPage";
import KuddysPickPage from "@pages/travel/KuddysPickPage";
import KuddysPickDetailPage from "@pages/travel/KuddysPickDetailPage";

import LoginRoutes from "@routes/LoginRoutes";
import CommunityRoutes from "@routes/CommunityRoutes";
import MyRoutes from "@routes/MyRoutes";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/travel" element={<TravelPage />} />
      <Route path="/travel/search" element={<TravelSearchPage />} />
      <Route path="/travel/:id" element={<TravelDetailPage />} />
      <Route path="/kuddys-pick" element={<KuddysPickPage />} />
      <Route path="/kuddys-pick/:id" element={<KuddysPickDetailPage />} />
      <Route path="/auth/*" element={<LoginRoutes />} />
      <Route path="/community/*" element={<CommunityRoutes />} />
      <Route path="/my/*" element={<MyRoutes />} />
    </Routes>
  );
}

export default App;
