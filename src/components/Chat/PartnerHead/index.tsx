import "./partnerhead.scss";
import backIcon from "@assets/icon/back.svg";
import { useNavigate } from "react-router-dom";

interface Props {
  userName: string;
  profileImgUrl: string;
}

export default function PartnerHead({ userName, profileImgUrl }: Props) {
  const navigate = useNavigate();
  const onBack = () => {
    //window.location.href = "http://localhost:3000/chat/list";
    navigate(-1);
  };
  return (
    <div className="partner-head-style">
      <div className="left-items-container">
        <img src={backIcon} alt="back" className="back-icon" onClick={onBack} />
        <img src={profileImgUrl} alt="back" className="profile" />
      </div>

      <p>{userName}</p>
    </div>
  );
}
