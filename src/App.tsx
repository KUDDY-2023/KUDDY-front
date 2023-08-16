import { Routes, Route } from "react-router-dom";
import "@style/common.scss";
import HomePage from './pages/HomePage';
import LoginGuidePage from "@pages/auth/LoginGuidePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/*" element={<LoginGuidePage />} />
    </Routes>
  );
}

export default App;
