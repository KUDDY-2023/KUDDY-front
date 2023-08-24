import { Routes, Route } from "react-router-dom";
import "@style/reset.scss"; // scss 설정
import "@style/common.scss";
import "@style/button.scss";

import HomePage from "@pages/HomePage";
import PickPage from "@pages/PickPage";
import KuddysPickRoutes from "@routes/KuddysPickRoutes";
import LoginRoutes from "@routes/LoginRoutes";
import TravelRoutes from "@routes/TravelRoutes";
import CommunityRoutes from "@routes/CommunityRoutes";
import MyRoutes from "@routes/MyRoutes";
import ChatRoutes from "@routes/ChatRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pick" element={<PickPage />} />
      <Route path="/travel/*" element={<TravelRoutes />} />
      <Route path="/kuddys-pick/*" element={<KuddysPickRoutes />} />
      <Route path="/auth/*" element={<LoginRoutes />} />
      <Route path="/community/*" element={<CommunityRoutes />} />
      <Route path="/my/*" element={<MyRoutes />} />
      <Route path="/chat/*" element={<ChatRoutes />} />
    </Routes>
  );
}

export default App;
