import { useEffect, useRef } from "react";

const useModal = (
  isOpened: boolean,
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutside = (e: any) => {
      if (
        isOpened &&
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpened(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isOpened]);

  return { buttonRef, modalRef };
};

export default useModal;
