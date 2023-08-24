import "./topbar.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "@components/communitylistpage/menu";
import { ReactComponent as ChatIcon } from "@assets/homepage/chat.svg";
import { ReactComponent as NewChatIcon } from "@assets/homepage/new_chat.svg";

type TopBarProps = {
  isCommunity?: boolean;
};

const TopBar = ({ isCommunity }: TopBarProps) => {
  const nav = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [newChat, isNewChat] = useState<boolean>(true);

  // 네비게이션 바 스크롤 감지에 따른 상태
  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    if (position === 0) setVisible(undefined);
    const handleScroll = () => {
      const moving = window.pageYOffset;
      setVisible(position > moving);
      setPosition(moving);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [position]);

  useEffect(() => {
    setPosition(0);
    setVisible(undefined);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const Content = () => {
    return (
      <>
        <div className="left">
          <div className="topbar-profile-circle" onClick={() => nav("/mypage")}>
            <img
              src="https://c1.wallpaperflare.com/preview/714/489/198/chess-chess-board-game-board-flag.jpg"
              alt="profile"
            />
          </div>
          <div className="topbar-title">KUDDY</div>
        </div>
        <div
          className="topbar-chat-container"
          onClick={() => nav(isLogin ? "/chat/list" : "login")}
        >
          {newChat ? <NewChatIcon /> : <ChatIcon />}
        </div>
      </>
    );
  };

  return (
    <>
      {isCommunity ? (
        <div
          className={
            visible === false
              ? "fade-out-community topbar-container topbar-community"
              : visible === true
              ? "fade-in-community topbar-container topbar-community"
              : "topbar-container topbar-community"
          }
        >
          <div className="inner">{Content()}</div>
          <Menu />
        </div>
      ) : (
        <div
          className={
            visible === false
              ? "fade-out topbar-container"
              : visible === true
              ? "fade-in topbar-container"
              : "topbar-container"
          }
        >
          {Content()}
        </div>
      )}
    </>
  );
};

export default TopBar;
