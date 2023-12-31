import "./my-menu-page.scss";
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
import Loading from "@components/_common/Loading";

const iconSrc = [
  { text: "My appointment", src: app, navTo: "/my/appointment" },
  { text: "My post", src: pos, navTo: "/my/post" },
  { text: "Tip for K-Buddy", src: tip, navTo: "" },
  {
    text: "Traveler verification",
    src: tic,
    navTo: "/my/traveler-verification",
  },
  { text: "Delete my account", src: del, navTo: "/auth/delete" },
];

const MyMenuPage = () => {
  const nav = useNavigate();
  const { data, isLoading, error } = useGetProfile();
  const [onLogout, logoutLoading] = useAuthLogout();

  return (
    <div className="my-menu-page-wrapper">
      {logoutLoading && (
        <Loading
          backColor="rgba(0, 0, 0, 0.5)"
          spinnerColor="#FFF798"
          size="80px"
        />
      )}
      <div className="xbtn-container">
        <XbtnIcon onClick={() => nav("/")} />
      </div>
      {data && (
        <>
          <div
            className="to-profile-click-area"
            onClick={() =>
              nav(`/profile/${data.data.data.memberInfo.nickname}`)
            }
          >
            <div className="profile-circle">
              <img src={data.data.data.memberInfo.profileImageUrl} />
            </div>
            <div className="name">{data.data.data.memberInfo.nickname}</div>
            <div className="email">{data.data.data.memberInfo.email}</div>
          </div>
          <div className="section-container">
            {iconSrc.map((item, idx) =>
              (idx !== 2 && idx !== 3) ||
              (idx === 3 && data.data.data.role === "TRAVELER") ? (
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
              ) : idx === 2 && data.data.data.role === "KUDDY" ? (
                <a
                  className="section"
                  key={item.text}
                  href="https://www.instagram.com/p/CybdWTKScC7/?igshid=MzRlODBiNWFlZA=="
                  target="_blank"
                >
                  <div className="left">
                    <img src={item.src} />
                    <p>{item.text}</p>
                  </div>
                  <ArrowIcon />
                </a>
              ) : null,
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
