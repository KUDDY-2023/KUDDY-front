import "./partnerhead.scss";
import backIcon from "@assets/icon/back.svg";

interface Props {
  userName: string;
  profileImgUrl: string;
}
export default function PartnerHead({ userName, profileImgUrl }: Props) {
  return (
    <div className="partner-head-style">
      <div className="left-items-container">
        <img src={backIcon} alt="back" className="back-icon" />
        <img src={profileImgUrl} alt="back" className="profile" />
      </div>

      <p>{userName}</p>
    </div>
  );
}
