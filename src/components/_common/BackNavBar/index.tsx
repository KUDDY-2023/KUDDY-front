import "./backnavbar.scss";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackIcon } from "@assets/icon/back.svg";
import { ReactComponent as ShareIcon } from "@assets/icon/share.svg";
import ViewMoreBtn from "@components/_common/ViewMoreBtn";

interface Props {
  middleTitle: string;
  isShare: boolean;
  hasMoreBtn?: boolean; // ... 버튼
  moreMenu?: ReactNode; // ... 버튼 - 메뉴
}

export default function BackNavBar({
  middleTitle,
  isShare,
  hasMoreBtn,
  moreMenu,
}: Props) {
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
      {hasMoreBtn && <ViewMoreBtn isComment={false}>{moreMenu}</ViewMoreBtn>}
    </div>
  );
}
