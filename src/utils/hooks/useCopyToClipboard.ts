import { successCopyLink } from "@components/_common/SweetAlert";

const useCopyToClipboard = (closer?: () => void) => {
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      successCopyLink();
      closer && closer();
    } catch (error) {}
  };
  return { onCopy };
};

export default useCopyToClipboard;
