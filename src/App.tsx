import React from "react";
import "@style/reset.scss"; // scss 설정
import { Routes, Route } from "react-router-dom";
import "@style/common.scss";
import HomePage from "./pages/HomePage";
import KuddysPickPage from "@pages/place/KuddysPickPage";
import KuddysPickDetailPage from "@pages/place/KuddysPickDetailPage";
import LoginGuidePage from "@pages/auth/LoginGuidePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/kuddys-pick" element={<KuddysPickPage />} />
      <Route path="/kuddys-pick/:id" element={<KuddysPickDetailPage />} />
      <Route path="/auth/*" element={<LoginGuidePage />} />
    </Routes>
  );
}

export default App;
