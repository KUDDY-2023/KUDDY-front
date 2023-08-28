import { Routes, Route } from "react-router-dom";

import AlarmViewPage from "@pages/alarm/AlarmViewPage";

export default function AlarmRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AlarmViewPage />} />
    </Routes>
  );
}
