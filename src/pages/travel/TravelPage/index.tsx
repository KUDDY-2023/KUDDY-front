import "./travel-page.scss";
import TravelBlock from "@components/Travel/TravelBlock";
import { categoryArray } from "@pages/travel/TravelPage/_mock";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ReactComponent as BackIcon } from "@assets/icon/back.svg";
import { ReactComponent as SearchIcon } from "@assets/icon/search.svg";
import { ReactComponent as XIcon } from "@assets/icon/xbtn.svg";

import { useRecoilState } from "recoil";
import { travelFilter } from "@services/store/travel";
import { useAllSpot } from "@services/hooks/spot";

const TravelPage = () => {
  const nav = useNavigate();
  const [filter, setFilter] = useRecoilState<SpotGetByFilterType>(travelFilter);
  const { pageLastItemRef, hasNextPage, data } = useAllSpot(filter);

  useEffect(() => {
    // console.log("filter", filter);
  }, [filter]);

  // searchParams로 filter 업데이트
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (!searchParams) return;
    setFilter({
      ...filter,
      keyword: searchParams.get("keyword") ? searchParams.get("keyword")! : "",
      category: searchParams.get("category")
        ? searchParams.get("category")!
        : "",
      district: searchParams.get("district")
        ? searchParams.get("district")!.split(" ")
        : [],
    });
  }, [searchParams]);

  // onClick에 바인딩하는 searchParams 업데이트 함수
  const handleCategory = (item: any) => {
    item.params
      ? searchParams.set("category", item.params)
      : searchParams.delete("category");
    setSearchParams(searchParams);
  };
  const deleteDistrict = (params: string) => {
    const filteredArray = searchParams
      .get("district")
      ?.split(" ")
      .filter(array => array !== params);
    searchParams.set("district", filteredArray!.join(" "));
    if (searchParams.get("district") === "") searchParams.delete("district");
    setSearchParams(searchParams);
  };

  // 카테고리 바 스크롤 관리
  const categoryBarRef = useRef<HTMLDivElement>(null);
  const selectedCategoryRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    categoryArray.map(
      item =>
        item.params === searchParams.get("category") &&
        (item.id > 3
          ? categoryBarRef.current!.scrollTo(
              selectedCategoryRef.current!.offsetLeft,
              0,
            )
          : categoryBarRef.current!.scrollTo(0, 0)),
    );
  }, []);

  // 필터 바 스크롤 감지에 따른 상태
  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    if (position === 0) setVisible(undefined);
    const handleScroll = () => {
      const moving = window.pageYOffset;
      setVisible(position > moving);
      setPosition(moving);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [position]);

  useEffect(() => {
    setPosition(0);
    setVisible(undefined);
  }, []);

  return (
    <div className="travelmenu-wrapper">
      <div
        className={
          visible === false && position > 150
            ? "fade-out top-section"
            : visible === true
            ? "fade-in top-section"
            : "top-section"
        }
      >
        <div className="kuddyspicksearchbar-wrapper">
          <BackIcon onClick={() => nav("/")} />
          <div
            className="kuddyspicksearchbar-rect"
            onClick={() => nav(`/travel/search${window.location.search}`)}
          >
            <form>
              <input
                readOnly
                value={filter.keyword ? filter.keyword : undefined}
                placeholder={`Everything for your travel`}
              />
              <button type="submit">
                <SearchIcon stroke="var(--color-black)" />
              </button>
            </form>
          </div>
        </div>
        <div className="category-bar" ref={categoryBarRef}>
          {categoryArray.map((item, idx) => (
            <div
              className={
                filter.category === "" && item.params === ""
                  ? "rect selected"
                  : filter.category === item.params
                  ? "rect selected"
                  : "rect"
              }
              ref={filter.category === item.params ? selectedCategoryRef : null}
              key={item.id}
              onClick={() => handleCategory(item)}
              style={{
                marginRight: idx === categoryArray.length - 1 ? "25px" : "0",
              }}
            >
              {item.params === ""
                ? "All"
                : item.params.replace(/^[a-z]/, char => char.toUpperCase())}
            </div>
          ))}
        </div>
        {filter.district.length !== 0 && (
          <div className="district-bar">
            {filter.district.map(item => (
              <div
                className="travelsearch-filter-rect"
                onClick={() => deleteDistrict(item)}
                key={item}
              >
                {item.replace(/^[a-z]/, char => char.toUpperCase())}
                <XIcon />
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        className="block-container"
        style={{ paddingTop: filter.district.length === 0 ? "116px" : "160px" }}
      >
        {data &&
          data.pages.map(page =>
            page.data.data.spots.length === 0 ? (
              <div className="empty">
                <div className="no-result">No result</div>
                <p>Try searching differently</p>
              </div>
            ) : (
              page.data.data.spots.map(
                (item: TravelPreviewType, idx: number) =>
                  page.data.data.pageInfo.size === idx + 1 ? (
                    <div
                      key={item.contentId}
                      ref={pageLastItemRef}
                      className="page-last-item-ref-rect"
                    >
                      <TravelBlock {...item} />
                    </div>
                  ) : (
                    <TravelBlock {...item} key={item.contentId} />
                  ),
              )
            ),
          )}
      </div>
      {data && !hasNextPage && data.pages[0].data.data.spots.length !== 0 && (
        <div>end of list</div>
      )}
    </div>
  );
};

export default TravelPage;
