import "./mates-page.scss";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TopBar from "@components/_common/TopBar";
import BottomNavBar from "@components/_common/BottomNavBar";
import MatesBlock from "@components/MatesPage/MatesBlock";
import { ReactComponent as ArrowIcon } from "@assets/icon/arrow_down.svg";
import { ReactComponent as CheckIcon } from "@assets/icon/check.svg";
import { matesArrayK, matesArrayT } from "@pages/mates/MatesPage/_mock";

const MatesPage = () => {
  const nav = useNavigate();
  const [matesType, setMatesType] = useState<string>("K-Buddy");
  const matetype = ["K-Buddy", "Traveler"];
  const [matesArray, setMatesArray] = useState<MatesType[]>(matesArrayK);

  useEffect(() => {
    setMatesArray(matesType === "K-Buddy" ? matesArrayK : matesArrayT);
  }, [matesType]);

  const [isOpened, setIsOpened] = useState<boolean>(true);
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <TopBar />
      <div
        className="mates-type-container"
        ref={buttonRef}
        onClick={() => setIsOpened(!isOpened)}
      >
        <div className="type-text">{matesType}</div>
        <ArrowIcon
          style={{ transform: isOpened ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </div>
      {isOpened && (
        <div className="mates-type-dropdown" ref={modalRef}>
          {matetype.map(item => (
            <div
              className="click-area"
              onClick={() => {
                setMatesType(item);
                setIsOpened(false);
              }}
            >
              <p style={{ fontWeight: matesType === item ? "700" : "500" }}>
                {item}
              </p>
              {matesType === item && <CheckIcon />}
            </div>
          ))}
        </div>
      )}
      <div className="mates-block-wrapper">
        {matesArray.map(item => (
          <MatesBlock {...item} />
        ))}
      </div>
      <BottomNavBar />
    </>
  );
};

export default MatesPage;
