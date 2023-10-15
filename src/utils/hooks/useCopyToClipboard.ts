import { successCopyLink } from "@components/_common/SweetAlert";
import { useLocation } from "react-router-dom";

// 복사 성공 alert 이후 닫아야할 모달이 있다면 closer 전달
const useCopyToClipboard = (closer?: () => void) => {
  const location = useLocation();
  const URL = process.env.REACT_APP_REACT_URL + location.pathname;
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(URL);
      successCopyLink();
      closer && closer();
    } catch (error) {
      console.log(error);
    }
  };
  return { onCopy };
};

export default useCopyToClipboard;
