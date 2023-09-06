import { Routes, Route } from "react-router-dom";
import "@style/reset.scss"; // scss 설정
import "@style/common.scss";
import "@style/button.scss";

import HomePage from "@pages/home/HomePage";
import YoutubePage from "@pages/home/YoutubePage";
import LocationRoutes from "@routes/LocationRoutes";
import PickPage from "@pages/pick/PickPage";
import AuthRoutes from "@routes/AuthRoutes";
import KuddysPickRoutes from "@routes/KuddysPickRoutes";
import TravelRoutes from "@routes/TravelRoutes";
import MatesRoutes from "@routes/MatesRoutes";
import CommunityRoutes from "@routes/CommunityRoutes";
import MyRoutes from "@routes/MyRoutes";
import ChatRoutes from "@routes/ChatRoutes";
import ProfileRoutes from "@routes/ProfileRoutes";
import AlarmViewPage from "@pages/alarm/AlarmViewPage";
import LoginProcessingPage from "@pages/auth/LoginProcessingPage";
import Test from "@pages/Test";

import { useSetLoginState } from "@services/hooks/auth";

function App() {
  useSetLoginState(); // 로그인 상태 업데이트

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/youtube" element={<YoutubePage />} />
      <Route path="/location/*" element={<LocationRoutes />} />
      <Route path="/pick" element={<PickPage />} />
      <Route path="/travel/*" element={<TravelRoutes />} />
      <Route path="/mates/*" element={<MatesRoutes />} />
      <Route path="/kuddys-pick/*" element={<KuddysPickRoutes />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/oauth2/redirect" element={<LoginProcessingPage />} />

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
