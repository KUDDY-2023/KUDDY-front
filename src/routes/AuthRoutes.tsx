import { Routes, Route } from "react-router-dom";

import RegisterPage from "@pages/auth/RegisterPage";
import LoginFormPage from "@pages/auth/LoginFormPage";
import LoginDonePage from "@pages/auth/LoginDonePage";
import DeleteAccountPage from "@pages/auth/DeleteAccountPage";
export default function LoginRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/form" element={<LoginFormPage />} />
      <Route path="/done" element={<LoginDonePage />} />
      <Route path="/delete" element={<DeleteAccountPage />} />
    </Routes>
  );
}
