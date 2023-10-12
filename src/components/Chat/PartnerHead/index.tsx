import "./partnerhead.scss";
import backIcon from "@assets/icon/back.svg";
import { ReactComponent as DefaultProfile } from "@assets/chat/profile_default.svg";
import { useNavigate } from "react-router-dom";

interface Props {
  userName: string;
  profileImgUrl: string;
}

export default function PartnerHead({ userName, profileImgUrl }: Props) {
  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };

  const gotoPartnerProfile = () => {
    navigate(`/profile/${userName}`);
  };

  let tempName = "User name";
  return (
    <div className="partner-head-style">
      <div className="left-items-container">
        <img src={backIcon} alt="back" className="back-icon" onClick={onBack} />
        {!profileImgUrl ? (
          <DefaultProfile />
        ) : (
          <img
            src={profileImgUrl}
            alt="back"
            className="profile"
            onClick={gotoPartnerProfile}
          />
        )}
      </div>

      <p>{!userName ? tempName : userName}</p>
    </div>
  );
}
