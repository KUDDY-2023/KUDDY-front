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
import {
  useGetAllProfile,
  useGetProfileByFilter,
} from "@services/hooks/profile";
import { useRecoilState } from "recoil";
import { profileFilter } from "@services/store/profile";

const MatesPage = () => {
  const nav = useNavigate();
  const [matesType, setMatesType] = useState<string>("K-Buddy");
  const matetype = ["K-Buddy", "Traveler"];
  const [matesArray, setMatesArray] = useState<MatesType[]>();
  const [searchParams, setSearchParams] = useSearchParams();

  const { pageLastItemRef, hasNextPage, data } = useGetAllProfile(matesType);

  useEffect(() => {
    // setMatesArray(matesType === "K-Buddy" ? matesArrayK : matesArrayT);
  }, [matesType]);

  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { buttonRef, modalRef } = useModal(isOpened, setIsOpened);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [filter, setFilter] = useRecoilState(profileFilter);
  useEffect(() => {
    searchParams.get("gender")
      ? setFilter({
          ...filter,
          gender: searchParams.get("gender")!.toUpperCase(),
        })
      : setFilter(filter);
    searchParams.get("language")
      ? setFilter({
          ...filter,
          languageType: searchParams
            .get("language")!
            .replace(/^[a-z]/, char => char.toUpperCase()),
        })
      : setFilter(filter);
    searchParams.get("district")
      ? setFilter({
          ...filter,
          areaName: searchParams
            .get("district")!
            .replace(/^[a-z]/, char => char.toUpperCase()),
        })
      : setFilter(filter);
    // interest
  }, [searchParams]);

  useEffect(() => {
    console.log(filter);
    if (
      filter.gender === "" &&
      filter.languageType === "" &&
      filter.areaName === "" &&
      filter.interestGroup === "" &&
      filter.interestContent === "" &&
      filter.nickname === ""
    ) {
    } else {
    }
  }, [filter]);

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
        {data &&
          data.pages.map(page =>
            page.data.data.profileList.length === 0 ? (
              <div className="empty">
                <div className="no-result">No result</div>
                <p>Try searching differently</p>
              </div>
            ) : (
              page.data.data.profileList.map((item: MatesType, idx: number) =>
                page.data.data.pageInfo.size === idx + 1 ? (
                  <div
                    key={item.profileId}
                    ref={pageLastItemRef}
                    className="page-last-item-ref-rect"
                  >
                    <MatesBlock {...item} key={item.profileId} />
                  </div>
                ) : (
                  <MatesBlock {...item} key={item.profileId} />
                ),
              )
            ),
          )}
      </div>
      <BottomNavBar />
    </>
  );
};

export default MatesPage;
