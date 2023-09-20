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

// 안읽은 알림 개수
import { useGetNotiCount } from "@services/hooks/notification";
// SSE
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";

type TopBarProps = {
  isCommunity?: boolean;
  handleMenuClick?: (menu: MenuType) => void;
};

const TopBar = ({ isCommunity, handleMenuClick }: TopBarProps) => {
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
  const [newNotification, isNewNotification] = useState<boolean>(false); // 새로운 댓글이 있을 때
  const [newChat, isNewChat] = useState<boolean>(true); // 새로운 채팅이 있을 때

  useEffect(() => {
    setPosition(0);
    setVisible(undefined);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    profileGetProfile()
      .then(res => {
        setProfileSrc(res.data.data.memberInfo.profileImageUrl);
      })
      .catch();
  }, []);

  /**
   * 로그인 했고, 안 읽은 알림이 있는 경우 (query로 요청)
   */
  const { notiCount } = useGetNotiCount(); // 알림개수 가져오기
  useEffect(() => {
    if (notiCount) isNewNotification(true);
    else isNewNotification(false);
  }, [notiCount]);

  /**
   * 새로운 알림이 발생한 경우
   * Notification SSE 연결
   */
  const [listening, setListening] = useState(false);
  const EventSource = EventSourcePolyfill || NativeEventSource;
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!listening && token) {
      // 로그인 한 경우만 요청
      setListening(true);
      try {
        const eventSource = new EventSource(
          `https://api.kuddy.co.kr/api/v1/notifications/subscribe`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          },
        );

        // 연결 됐을 때
        eventSource.onopen = async event => {
          console.log("연결 성공", event);
        };

        // 이벤트 왔을 때
        eventSource.onmessage = event => {
          if (event.data.startsWith("{")) {
            console.log("댓글 알림 발생", event.data);
            isNewNotification(true);
          }
        };

        // 에러 발생 & 연결 끊겼을 때
        eventSource.onerror = (event: any) => {
          console.log("에러 발생");
          if (event.readyState == EventSource.CLOSED) {
            console.log("에러 발생 : CLOSED");
          }
        };
      } catch (err) {
        setListening(false);
        alert("알림 연결 실패");
      }
    }
  }, [listening]);

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
          {handleMenuClick && <Menu handleMenuClick={handleMenuClick} />}
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
