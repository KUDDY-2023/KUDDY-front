import { Routes, Route } from "react-router-dom";
import ChatListPage from "@pages/chat/ChatListPage";
import ChatPage from "@pages/chat/ChatPage";
export default function ChatRoutes() {
  return (
    <Routes>
      <Route path="/list" element={<ChatListPage />} />
      <Route path="/:id" element={<ChatPage />} />
    </Routes>
  );
}
