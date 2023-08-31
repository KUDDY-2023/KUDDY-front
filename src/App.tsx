import { Routes, Route } from "react-router-dom";
import "@style/reset.scss"; // scss 설정
import "@style/common.scss";
import "@style/button.scss";

import HomePage from "@pages/home/HomePage";
import PickPage from "@pages/pick/PickPage";
import AuthRoutes from "@routes/AuthRoutes";
import KuddysPickRoutes from "@routes/KuddysPickRoutes";
import TravelRoutes from "@routes/TravelRoutes";
import CommunityRoutes from "@routes/CommunityRoutes";
import MyRoutes from "@routes/MyRoutes";
import ChatRoutes from "@routes/ChatRoutes";
import ProfileRoutes from "@routes/ProfileRoutes";
import AlarmViewPage from "@pages/alarm/AlarmViewPage";
import Test from "@pages/Test";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pick" element={<PickPage />} />
      <Route path="/travel/*" element={<TravelRoutes />} />
      <Route path="/kuddys-pick/*" element={<KuddysPickRoutes />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/community/*" element={<CommunityRoutes />} />
      <Route path="/my/*" element={<MyRoutes />} />
      <Route path="/chat/*" element={<ChatRoutes />} />
      <Route path="/profile/*" element={<ProfileRoutes />} />
      <Route path="/alarm" element={<AlarmViewPage />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
