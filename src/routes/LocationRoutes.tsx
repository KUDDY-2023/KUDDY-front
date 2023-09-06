import { Routes, Route } from "react-router-dom";
import LocationMapPage from "@pages/home/LocationMapPage";
import LocationListPage from "@pages/home/LocationListPage";

export default function LocationRoutes() {
  return (
    <Routes>
      <Route path="/map" element={<LocationMapPage />} />
      <Route path="/list" element={<LocationListPage />} />
    </Routes>
  );
}
