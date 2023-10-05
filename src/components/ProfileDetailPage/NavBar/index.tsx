import "./nav-bar.scss";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackIcon } from "@assets/icon/back.svg";
import ViewMoreBtn from "@components/_common/ViewMoreBtn";

type Props = {
  profileId: number;
  isMine: boolean;
};

const NavBar = ({ profileId, isMine }: Props) => {
  const nav = useNavigate();
  const { nickname } = useParams();

  const handleGoBack = () => {
    nav("/my");
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
