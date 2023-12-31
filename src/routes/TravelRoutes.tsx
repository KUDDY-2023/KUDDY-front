import { Routes, Route } from "react-router-dom";
import TravelPage from "@pages/travel/TravelPage";
import TravelSearchPage from "@pages/travel/TravelSearchPage";
import TravelDetailPage from "@pages/travel/TravelDetailPage";
import TravelMatesPage from "@pages/travel/TravelMatesPage";

export default function TravelRoutes() {
  return (
    <Routes>
      <Route path="/list" element={<TravelPage />} />
      <Route path="/search" element={<TravelSearchPage />} />
      <Route path="/:id" element={<TravelDetailPage />} />
      <Route path="/:id/users" element={<TravelMatesPage />} />
    </Routes>
  );
}
