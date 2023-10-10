import "./nav-bar.scss";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import { ReactComponent as BackIcon } from "@assets/icon/back.svg";
import ViewMoreBtn from "@components/_common/ViewMoreBtn";

type Props = {
  profileId: number;
  isMine: boolean;
};

const NavBar = ({ profileId, isMine }: Props) => {
  const nav = useNavigate();
  const { nickname } = useParams();
  const location = useLocation();

  const handleGoBack = () => {
    // 이전 path가 프로필 수정 페이지면 마이 페이지로(location.state 값이 있으면 수정 페이지)
    // 그 외의 페이지면 이전 페이지로 이동
    if (location.state === null) {
      nav(-1);
    } else {
      nav("/my");
    }
  };

  // 프로필 공유
  const handleShareClick = () => {
    console.log("share link");
  };

  // 프로필 신고
  const handleReportClick = () => {
    nav(`/my/report?userId=${profileId}`);
  };

  return (
    <div className="nav-bar-container">
      <BackIcon onClick={handleGoBack} id="back-icon" />
      <div id="else-icon">
        <ViewMoreBtn isComment={false}>
          <>
            {!isMine && (
              <div className="menu-click-area" onClick={handleReportClick}>
                <p>report user</p>
              </div>
            )}
            <div className="menu-click-area" onClick={handleShareClick}>
              <p>share link</p>
            </div>
          </>
        </ViewMoreBtn>
      </div>
    </div>
  );
};

export default NavBar;
