import { Routes, Route } from "react-router-dom";
import KuddysPickPage from "@pages/kuddyspick/KuddysPickPage";
import KuddysPickDetailPage from "@pages/kuddyspick/KuddysPickDetailPage";

export default function KuddysPickRoutes() {
  return (
    <Routes>
      <Route path="/list" element={<KuddysPickPage />} />
      <Route path="/:id" element={<KuddysPickDetailPage />} />
    </Routes>
  );
}
