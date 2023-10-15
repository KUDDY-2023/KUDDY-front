import "./backnavbar.scss";
import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as BackIcon } from "@assets/icon/back.svg";
import { ReactComponent as ShareIcon } from "@assets/icon/share.svg";
import ViewMoreBtn from "@components/_common/ViewMoreBtn";
import { clipboardAlert } from "../SweetAlert";
import Modal from "@components/_common/Modal";

interface Props {
  middleTitle: string;
  isShare: boolean;
  onClick?: () => void;
  hasMoreBtn?: boolean; // ... 버튼
  children?: ReactNode; // ... 버튼 - 메뉴
  setModalOpen?: (modalOpen: boolean) => void;
}

export default function BackNavBar({
  middleTitle,
  isShare,
  onClick,
  hasMoreBtn,
  children,
  setModalOpen,
}: Props) {
  const navigate = useNavigate();

  const goBack = () => {
    if (!!onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  const location = useLocation();

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      clipboardAlert();
    } catch (err) {
      console.log(err);
    }
  };

  const _handleShare = () => {
    const URL = process.env.REACT_APP_REACT_URL + location.pathname;
    handleCopyClipBoard(URL);
  };

  return (
    <>
      <div className="backnavbar-container">
        <BackIcon onClick={goBack} id="back" />
        <p>{middleTitle}</p>
        {isShare && (
          <ShareIcon
            onClick={() => (setModalOpen ? setModalOpen(true) : null)}
            id="share"
          />
        )}
        {hasMoreBtn && (
          <div id="more">
            <ViewMoreBtn isComment={false}>{children}</ViewMoreBtn>
          </div>
        )}
      </div>
    </>
  );
}
