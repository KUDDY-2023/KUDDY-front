import { Routes, Route } from "react-router-dom";
import ProfileDetailPage from "@pages/profile/ProfileDetailPage";
import ProfileModifyPage from "@pages/profile/ProfileModifyPage";

export default function ProfileRoutes() {
  return (
    <Routes>
      <Route path="/:nickname" element={<ProfileDetailPage />} />
      <Route path="/modify" element={<ProfileModifyPage />} />
    </Routes>
  );
}
