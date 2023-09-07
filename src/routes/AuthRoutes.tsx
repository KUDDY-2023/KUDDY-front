import { Routes, Route } from "react-router-dom";

import RegisterPage from "@pages/auth/RegisterPage";
import LoginFormPage from "@pages/auth/LoginFormPage";
import LoginDonePage from "@pages/auth/LoginDonePage";
import DeleteAccountPage from "@pages/auth/DeleteAccountPage";
import PrivacyPage from "@pages/auth/PrivacyPage";
import PrivateRoute from "./PrivateRoute";
export default function LoginRoutes() {
  return (
    <Routes>
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route element={<PrivateRoute authentication={false} />}>
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<PrivateRoute authentication={true} />}>
        <Route path="/form" element={<LoginFormPage />} />
        <Route path="/done" element={<LoginDonePage />} />
        <Route path="/delete" element={<DeleteAccountPage />} />
      </Route>
    </Routes>
  );
}
