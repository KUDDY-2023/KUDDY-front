import React from "react";
import "./App.scss"; // scss 설정
import { Routes, Route } from "react-router-dom";
import LoginGuidePage from "@pages/auth/LoginGuidePage";
function App() {
  return (
    <Routes>
      <Route path="/auth/*" element={<LoginGuidePage />} />
    </Routes>
  );
}

export default App;
