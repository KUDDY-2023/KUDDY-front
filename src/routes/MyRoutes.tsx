import { Routes, Route } from "react-router-dom";
import ReportUserPage from "@pages/my/ReportUserPage";
export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/report" element={<ReportUserPage />} />
    </Routes>
  );
}
