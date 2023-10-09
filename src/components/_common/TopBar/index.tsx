import "./top-bar.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "@components/CommunityListPage/Menu";
import { ReactComponent as ChatIcon } from "@assets/topbar/chat_default.svg";
import { ReactComponent as NewChatIcon } from "@assets/topbar/chat_new.svg";
import { ReactComponent as NotificationIcon } from "@assets/topbar/notification_default.svg";
import { ReactComponent as NewNotificationIcon } from "@assets/topbar/notification_new.svg";

import { useQuery } from "react-query";
import { profileGetProfile } from "@services/api/profile";
import { useSetLoginState } from "@services/hooks/auth";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { profileImage } from "@services/store/profile";
import defaultprofileimage from "@assets/topbar/profile_default.svg";
import { isLoginState } from "@services/store/auth";
import { profileState } from "@services/store/auth";

// 안읽은 알림 개수
import {
  useGetCommentNotiCount,
  useGetChatNotiCount,
} from "@services/hooks/notification";
// SSE
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";

import { useSSE } from "@services/hooks/notification";

type TopBarProps = {
  isCommunity?: boolean;
  handleMenuClick?: (menu: MenuType) => void;
};

const TopBar = ({ isCommunity, handleMenuClick }: TopBarProps) => {
  const nav = useNavigate();
  useSetLoginState();
  const isLogin = useRecoilValue(isLoginState);

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

  const [profileSrc, setProfileSrc] = useRecoilState(profileImage);
  const resetProfileImage = useResetRecoilState(profileImage);
  const { data, refetch } = useQuery(["profile"], profileGetProfile, {
    staleTime: 1800000,
    cacheTime: Infinity,
    enabled: profileSrc === defaultprofileimage,
  });
  useEffect(() => {
    if (!data) return;
    else {
      if (isLogin) setProfileSrc(data.data.data.memberInfo.profileImageUrl);
    }
  }, [data]);
  useEffect(() => {
    if (isLogin === false) resetProfileImage();
  }, [isLogin]);
  const profile = useRecoilValue(profileState);
  useEffect(() => {
    refetch();
  }, [profile]);

  /* 알림 상태 관리 hook */
  const { newNotification } = useSSE();

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
          <div onClick={() => nav(isLogin ? "/alarm" : "/auth/register")}>
            {newNotification.alarm && isLogin ? (
              <NewNotificationIcon />
            ) : (
              <NotificationIcon />
            )}
          </div>
          <div onClick={() => nav(isLogin ? "/chat/list" : "/auth/register")}>
            {newNotification.chat && isLogin ? <NewChatIcon /> : <ChatIcon />}
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
            visible === false && position > 100
              ? "fade-out-community topbar-community"
              : visible === true
              ? "fade-in-community topbar-community"
              : "topbar-community"
          }
        >
          <div className="inner">{Content()}</div>
          {handleMenuClick && <Menu handleMenuClick={handleMenuClick} />}
        </div>
      ) : (
        <div
          className={
            visible === false && position > 60
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
