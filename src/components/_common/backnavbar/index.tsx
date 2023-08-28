import "./backnavbar.scss";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackIcon } from "@assets/icon/back.svg";
import { ReactComponent as ShareIcon } from "@assets/icon/share.svg";

interface Props {
  middleTitle: string;
  isShare: boolean;
}

export default function BackNavBar({ middleTitle, isShare }: Props) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const _handleShare = () => {
    console.log("현재 url  복사");
  };

  return (
    <div className="backnavbar-container">
      <BackIcon onClick={goBack} id="back" />
      <p>{middleTitle}</p>

      {isShare && <ShareIcon onClick={_handleShare} id="share" />}
    </div>
  );
}
