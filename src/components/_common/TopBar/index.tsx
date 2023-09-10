import "./top-bar.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "@components/CommunityListPage/Menu";
import defaultprofile from "@assets/topbar/profile_default.svg";
import { ReactComponent as ChatIcon } from "@assets/topbar/chat_default.svg";
import { ReactComponent as NewChatIcon } from "@assets/topbar/chat_new.svg";
import { ReactComponent as NotificationIcon } from "@assets/topbar/notification_default.svg";
import { ReactComponent as NewNotificationIcon } from "@assets/topbar/notification_new.svg";

import { profileGetProfile } from "@services/api/profile";
import { useSetLoginState } from "@services/hooks/auth";

type TopBarProps = {
  isCommunity?: boolean;
};

const TopBar = ({ isCommunity }: TopBarProps) => {
  const nav = useNavigate();
  useSetLoginState();
  const [isLogin, setIsLogin] = useState<boolean>(true);

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

  const [profileSrc, setProfileSrc] = useState<string>(defaultprofile);
  const [newNotification, isNewNotification] = useState<boolean>(true);
  const [newChat, isNewChat] = useState<boolean>(true);

  useEffect(() => {
    setPosition(0);
    setVisible(undefined);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    profileGetProfile()
      .then(res => {
        setProfileSrc(res.data.data.profileImage);
      })
      .catch();
  }, []);

  const Content = () => {
    return (
      <>
        <div className="left">
          <div className="topbar-profile-circle" onClick={() => nav("/my")}>
            <img src={profileSrc} alt="profile" />
          </div>
          <div className="topbar-title">KUDDY</div>
        </div>
        <div className="topbar-icon-container">
          <div onClick={() => nav(isLogin ? "/alarm" : "/auth/login")}>
            {newNotification && isLogin ? (
              <NewNotificationIcon />
            ) : (
              <NotificationIcon />
            )}
          </div>
          <div onClick={() => nav(isLogin ? "/chat/list" : "/auth/login")}>
            {newChat && isLogin ? <NewChatIcon /> : <ChatIcon />}
          </div>
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
