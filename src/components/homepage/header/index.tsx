import "./header.scss";
import { ReactComponent as ChatIcon } from "@assets/homepage/chat.svg";
import { ReactComponent as NewChatIcon } from "@assets/homepage/new_chat.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const nav = useNavigate();
  const [newChat, isNewChat] = useState<Boolean>(true);
  return (
    <div className="header-container">
      <div className="left">
        <div className="header-profile-circle" onClick={() => nav("/mypage")}>
          <img
            src="https://c1.wallpaperflare.com/preview/714/489/198/chess-chess-board-game-board-flag.jpg"
            alt="profile"
          />
        </div>
        <div className="header-title">KUDDY</div>
      </div>
      <div className="header-chat-container" onClick={() => nav("/chat")}>
        {newChat ? <NewChatIcon /> : <ChatIcon />}
      </div>
    </div>
  );
};

export default Header;
