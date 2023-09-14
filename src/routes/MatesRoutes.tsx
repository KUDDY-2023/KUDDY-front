import { Routes, Route } from "react-router-dom";
import MatesPage from "@pages/mates/MatesPage";
import MatesSearchPage from "@pages/mates/MatesSearchPage";

export default function TravelRoutes() {
  return (
    <Routes>
      <Route path="/list" element={<MatesPage />} />
      <Route path="/search" element={<MatesSearchPage />} />
    </Routes>
  );
}
