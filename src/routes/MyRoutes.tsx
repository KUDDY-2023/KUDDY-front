import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import MyMenuPage from "@pages/my/MyMenuPage";
import ReportUserPage from "@pages/my/ReportUserPage";
import AppointmentPage from "@pages/my/AppointmentPage";
import MyPostListPage from "@pages/my/MyPostListPage";
import TicketVerificationPage from "@pages/my/TicketVertificationPage";
import WriteReviewPage from "@pages/my/WriteReviewPage";

export default function MyRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoute authentication={true} />}>
        <Route path="/" element={<MyMenuPage />} />
        <Route path="/report" element={<ReportUserPage />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path="/post" element={<MyPostListPage />} />
        <Route
          path="/traveler-verification"
          element={<TicketVerificationPage />}
        />
        <Route path="/write-review/:id" element={<WriteReviewPage />} />
      </Route>
    </Routes>
  );
}
