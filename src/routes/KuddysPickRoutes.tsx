import { Routes, Route } from "react-router-dom";
import KuddysPickPage from "@pages/travel/KuddysPickPage";
import KuddysPickDetailPage from "@pages/travel/KuddysPickDetailPage";

export default function KuddysPickRoutes() {
  return (
    <Routes>
      <Route path="/list" element={<KuddysPickPage />} />
      <Route path="/:id" element={<KuddysPickDetailPage />} />
    </Routes>
  );
}
