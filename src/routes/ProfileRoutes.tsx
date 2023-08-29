import { Routes, Route } from "react-router-dom";
import ProfileDetailPage from "@pages/profile/ProfileDetailPage";

export default function ProfileRoutes() {
  return (
    <Routes>
      <Route path="/:nickname" element={<ProfileDetailPage />} />
    </Routes>
  );
}
