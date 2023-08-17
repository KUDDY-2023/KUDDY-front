import { Routes, Route } from "react-router-dom";

import LoginGuidePage from "@pages/auth/LoginGuidePage";
import LoginDonePage from "@pages/auth/LoginDonePage";
export default function LoginRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<LoginGuidePage />} />
      <Route path="/done" element={<LoginDonePage />} />
    </Routes>
  );
}
