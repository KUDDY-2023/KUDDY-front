import "./topbar.scss";
import { ReactComponent as ChatIcon } from "@assets/homepage/chat.svg";
import { ReactComponent as NewChatIcon } from "@assets/homepage/new_chat.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const nav = useNavigate();
  const [newChat, isNewChat] = useState<Boolean>(true);
  return (
    <div className="topbar-container">
      <div className="left">
        <div className="topbar-profile-circle" onClick={() => nav("/mypage")}>
          <img
            src="https://c1.wallpaperflare.com/preview/714/489/198/chess-chess-board-game-board-flag.jpg"
            alt="profile"
          />
        </div>
        <div className="topbar-title">KUDDY</div>
      </div>
      <div className="topbar-chat-container" onClick={() => nav("/chat")}>
        {newChat ? <NewChatIcon /> : <ChatIcon />}
      </div>
    </div>
  );
};

export default TopBar;
