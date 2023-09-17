import "./my-menu-page.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as XbtnIcon } from "@assets/icon/xbtn.svg";
import { ReactComponent as ArrowIcon } from "@assets/my/arrow_right_midi.svg";
import app from "@assets/my/appointment.svg";
import pos from "@assets/my/post.svg";
import tip from "@assets/my/star.svg";
import tic from "@assets/my/ticket.svg";
import del from "@assets/my/delete_account.svg";
import log from "@assets/my/logout.svg";

import { useGetProfile } from "@services/hooks/profile";
import { useAuthLogout } from "@services/hooks/auth";

const iconSrc = [
  { text: "My appoitment", src: app, navTo: "/my/appointment" },
  { text: "My post", src: pos, navTo: "/my/post" },
  { text: "Tip for K-Buddy", src: tip, navTo: "/my/tip" },
  { text: "Ticket verification", src: tic, navTo: "/my/ticket-verification" },
  { text: "Delete my account", src: del, navTo: "/my/delete" },
];

const MyMenuPage = () => {
  const nav = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>();

  const { data, isLoading, error } = useGetProfile();
  const onLogout = useAuthLogout();

  useEffect(() => {
    if (data) setUserInfo(data.data.data);
  }, [isLoading]);

  return (
    <div className="my-menu-page-wrapper">
      <div className="xbtn-container">
        <XbtnIcon onClick={() => nav("/")} />
      </div>
      {userInfo && (
        <>
          <div
            className="to-profile-click-area"
            onClick={() => nav(`/profile/${userInfo.memberInfo.nickname}`)}
          >
            <div className="profile-circle">
              <img src={userInfo.memberInfo.profileImageUrl} />
            </div>
            <div className="name">{userInfo.memberInfo.nickname}</div>
            <div className="email">{userInfo.memberInfo.email}</div>
          </div>
          <div className="section-container">
            {iconSrc.map(
              (item, idx) =>
                ((idx !== 2 && idx !== 3) ||
                  (idx === 2 && userInfo.role === "KUDDY") ||
                  (idx === 3 && userInfo.role === "TRAVELER")) && (
                  <div
                    className="section"
                    key={item.text}
                    onClick={() => nav(item.navTo)}
                  >
                    <div className="left">
                      <img src={item.src} />
                      <p>{item.text}</p>
                    </div>
                    <ArrowIcon />
                  </div>
                ),
            )}
          </div>
        </>
      )}
      <div className="logout-container section">
        <div className="left" onClick={() => onLogout()}>
          <img src={log} />
          <p>Log out</p>
        </div>
        <div className="none" />
      </div>
    </div>
  );
};

export default MyMenuPage;
