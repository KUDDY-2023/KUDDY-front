import { Routes, Route } from "react-router-dom";
import ReportUserPage from "@pages/my/ReportUserPage";
import AppointmentPage from "@pages/my/AppointmentPage";
import WriteReviewPage from "@pages/my/WriteReviewPage";

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/report" element={<ReportUserPage />} />
      <Route path="/appointment" element={<AppointmentPage />} />
      <Route path="/write-review/:id" element={<WriteReviewPage />} />
    </Routes>
  );
}
