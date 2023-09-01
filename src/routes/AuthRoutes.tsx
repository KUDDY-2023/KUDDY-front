import { Routes, Route } from "react-router-dom";

import RegisterPage from "@pages/auth/RegisterPage";
import KakaoLoginPage from "@pages/auth/KakaoLoginPage";
import LoginFormPage from "@pages/auth/LoginFormPage";
import LoginDonePage from "@pages/auth/LoginDonePage";
import DeleteAccountPage from "@pages/auth/DeleteAccountPage";
export default function LoginRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/KakaoLogin" element={<KakaoLoginPage />} />
      <Route path="/GoogleLogin" element={<KakaoLoginPage />} />

      <Route path="/form" element={<LoginFormPage />} />
      <Route path="/done" element={<LoginDonePage />} />
      <Route path="/delete" element={<DeleteAccountPage />} />
    </Routes>
  );
}
