import { Routes, Route } from "react-router-dom";
import MyMenuPage from "@pages/my/MyMenuPage";
import ReportUserPage from "@pages/my/ReportUserPage";
import AppointmentPage from "@pages/my/AppointmentPage";
import MyPostListPage from "@pages/my/MyPostListPage";
import TicketVerificationPage from "@pages/my/TicketVertificationPage";
import WriteReviewPage from "@pages/my/WriteReviewPage";

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MyMenuPage />} />
      <Route path="/report" element={<ReportUserPage />} />
      <Route path="/appointment" element={<AppointmentPage />} />
      <Route path="/post" element={<MyPostListPage />} />
      <Route path="/ticket-verification" element={<TicketVerificationPage />} />
      <Route path="/write-review/:id" element={<WriteReviewPage />} />
    </Routes>
  );
}
