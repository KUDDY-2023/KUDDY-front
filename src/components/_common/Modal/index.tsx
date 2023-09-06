import "./modal.scss";
import { MouseEventHandler, useEffect } from "react";
import { ReactComponent as XBtnIcon } from "@assets/icon/xbtn.svg";

type ModalProps = {
  children: any;
  isOpen: boolean;
  closer: MouseEventHandler<HTMLDivElement | SVGSVGElement>;
  isXbtn?: boolean;
};

const Modal = ({ children, isOpen, closer, isXbtn }: ModalProps) => {
  useEffect(() => {
    document.body.style.cssText = `
              position: fixed;
              top: -${window.scrollY}px;
              overflow-y: scroll;
              width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <>
      {isOpen ? (
        <div className="modal-wrapper">
          <div className="background" onClick={closer} />
          <div className="block">
            {children}
            {isXbtn && <XBtnIcon className="xbtn" onClick={closer} />}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
