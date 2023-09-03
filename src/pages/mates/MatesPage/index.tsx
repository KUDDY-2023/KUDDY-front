import "./mates-page.scss";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useModal from "@utils/hooks/useModal";
import TopBar from "@components/_common/TopBar";
import BottomNavBar from "@components/_common/BottomNavBar";
import MatesSearchBar from "@components/MatesPage/MatesSearchBar";
import MatesBlock from "@components/MatesPage/MatesBlock";
import { ReactComponent as ArrowIcon } from "@assets/icon/arrow_down.svg";
import { ReactComponent as CheckIcon } from "@assets/icon/check.svg";
import { matesArrayK, matesArrayT } from "@pages/mates/MatesPage/_mock";

const MatesPage = () => {
  const nav = useNavigate();
  const [matesType, setMatesType] = useState<string>("K-Buddy");
  const matetype = ["K-Buddy", "Traveler"];
  const [matesArray, setMatesArray] = useState<MatesType[]>(matesArrayK);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setMatesArray(matesType === "K-Buddy" ? matesArrayK : matesArrayT);
  }, [matesType]);

  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { buttonRef, modalRef } = useModal(isOpened, setIsOpened);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setMatesArray(matesArray);
  }, [searchParams]);

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
              key={item}
            >
              <p style={{ fontWeight: matesType === item ? "700" : "500" }}>
                {item}
              </p>
              {matesType === item && <CheckIcon />}
            </div>
          ))}
        </div>
      )}
      <MatesSearchBar />
      <div className="mates-block-wrapper">
        {matesArray &&
          (matesArray.length === 0 ? (
            <div className="empty">
              <div className="no-result">No result</div>
              <p>Try searching differently</p>
            </div>
          ) : (
            matesArray.map(item => <MatesBlock {...item} key={item.id} />)
          ))}
      </div>
      <BottomNavBar />
    </>
  );
};

export default MatesPage;
