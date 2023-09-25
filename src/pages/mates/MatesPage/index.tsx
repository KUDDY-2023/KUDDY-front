import "./mates-page.scss";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useModal from "@utils/hooks/useModal";
import TopBar from "@components/_common/TopBar";
import BottomNavBar from "@components/_common/BottomNavBar";
import Loading from "@components/_common/Loading";
import MatesSearchBar from "@components/MatesPage/MatesSearchBar";
import MatesBlock from "@components/MatesPage/MatesBlock";
import { ReactComponent as ArrowIcon } from "@assets/icon/arrow_down.svg";
import { ReactComponent as CheckIcon } from "@assets/icon/check.svg";
import { useGetProfileByFilter } from "@services/hooks/profile";
import { useRecoilState } from "recoil";
import { buddyType, profileFilter } from "@services/store/profile";
import { interestArray } from "@pages/mates/MatesPage/_mock";

const MatesPage = () => {
  const matetype = ["K-Buddy", "Traveler"];
  const [matesType, setMatesType] = useRecoilState(buddyType);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useRecoilState(profileFilter);
  const { pageLastItemRef, hasNextPage, data, isFetching } =
    useGetProfileByFilter(filter);

  useEffect(() => {
    setFilter({
      ...filter,
      role: matesType === "K-Buddy" ? "KUDDY" : "TRAVELER",
    });
  }, [matesType]);

  useEffect(() => {
    if (!searchParams) return;
    setFilter({
      ...filter,
      genderType: searchParams.get("gender")
        ? searchParams.get("gender")!.toUpperCase()
        : "",
      languageType: searchParams.get("language")
        ? searchParams
            .get("language")!
            .replace(/^[a-z]/, char => char.toUpperCase())
        : "",
      areaName: searchParams.get("district")
        ? searchParams
            .get("district")!
            .replace(/^[a-z]/, char => char.toUpperCase())
        : "",
      nickname: searchParams.get("keyword")
        ? String(searchParams.get("keyword"))
        : "",
      interestContent: searchParams.get("interest")
        ? searchParams.get("interest")!.toUpperCase()
        : "",
      interestGroup: searchParams.get("interest")
        ? interestArray
            .map(item =>
              item.element === searchParams.get("interest")!.toUpperCase()
                ? item.group
                : "",
            )
            .filter(item => item !== "")[0]
        : "",
    });
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(data);
  console.log(filter);

  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { buttonRef, modalRef } = useModal(isOpened, setIsOpened);

  return (
    <div className="mates-page-wrapper">
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
          (isFetching ? (
            <div className="loading-container">
              <Loading
                backColor="transparent"
                spinnerColor="#eee"
                size="30px"
              />
            </div>
          ) : data.pages[0].data.data.profileList.length === 0 ? (
            <div className="empty">
              <div className="no-result">No result</div>
              <p>Try searching differently</p>
            </div>
          ) : (
            data.pages.map(page =>
              page.data.data.profileList.map((item: MatesType, idx: number) =>
                page.data.data.pageInfo.size === idx + 1 ? (
                  <div
                    key={item.profileId}
                    ref={pageLastItemRef}
                    className="page-last-item-ref-rect"
                  >
                    {item.allInterests && (
                      <MatesBlock {...item} key={item.profileId} />
                    )}
                  </div>
                ) : (
                  item.allInterests && (
                    <MatesBlock {...item} key={item.profileId} />
                  )
                ),
              ),
            )
          ))}
      </div>
      <BottomNavBar />
    </div>
  );
};

export default MatesPage;
