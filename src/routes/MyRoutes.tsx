import { Routes, Route } from "react-router-dom";
import ReportUserPage from "@pages/my/ReportUserPage";
import AppointmentPage from "@pages/my/AppointmentPage";

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/report" element={<ReportUserPage />} />
      <Route path="/appointment" element={<AppointmentPage />} />
    </Routes>
  );
}
