import { Routes, Route } from "react-router-dom";
import ChatListPage from "@pages/chat/ChatListPage";
import ChatPage from "@pages/chat/ChatPage";
import PrivateRoute from "./PrivateRoute";

export default function ChatRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoute authentication={true} />}>
        <Route path="/list" element={<ChatListPage />} />
        <Route path="/:roomId" element={<ChatPage />} />
      </Route>
    </Routes>
  );
}
