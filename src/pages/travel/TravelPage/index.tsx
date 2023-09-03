import "./travel-page.scss";
import TravelBlock from "@components/Travel/TravelBlock";
import { categoryArray, travelArray } from "@pages/travel/TravelPage/_mock";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ReactComponent as BackIcon } from "@assets/icon/back.svg";
import { ReactComponent as SearchIcon } from "@assets/icon/search.svg";
import { ReactComponent as XIcon } from "@assets/icon/xbtn.svg";

// 필터 적용된 상태에서 다시 /search로 이동하면 이전 필터 기록 저장 안됨
// 필터 중복 적용 안됨 (프론트 로직 상에서)
const TravelPage = () => {
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentCategory, setCurrentCategory] = useState<string | null>(
    searchParams.get("category"),
  );
  const categoryBarRef = useRef<HTMLDivElement>(null);
  const selectedCategory = useRef<HTMLDivElement>(null);
  const [currentDistrict, setCurrentDistrict] = useState<string | null>(
    searchParams.get("district"),
  );
  const [currentKeyword, setCurrentKeyword] = useState<string | null>(
    searchParams.get("keyword"),
  );
  useEffect(() => {
    setCurrentCategory(searchParams.get("category"));
    setCurrentDistrict(searchParams.get("district"));
    setCurrentKeyword(searchParams.get("keyword"));
  }, [searchParams]);

  const handleCategory = (item: any) => {
    if (item.params === "") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      searchParams.set("category", item.params);
      setSearchParams(searchParams);
    }
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

  const [searchedList, setSearchedList] =
    useState<TravelPreviewType[]>(travelArray);
  useEffect(() => {
    if (currentCategory === null) {
      setSearchedList(travelArray);
    } else {
      setSearchedList(
        travelArray.filter(item => item.category === currentCategory),
      );
    }
  }, [currentCategory]);
  useEffect(() => {
    if (currentDistrict === null) {
      setSearchedList(travelArray);
    } else {
      setSearchedList(
        travelArray.filter(item => {
          return currentDistrict
            .split(" ")
            .includes(
              item.district.replace(/^[A-Z]/, char => char.toLowerCase()),
            );
        }),
      );
    }
  }, [currentDistrict]);
  useEffect(() => {
    if (currentKeyword === null) {
      setSearchedList(travelArray);
    } else {
      setSearchedList(
        travelArray.filter(item => item.name.includes(currentKeyword)),
      );
    }
  }, [currentKeyword]);

  useEffect(() => {
    window.scrollTo(0, 0);
    categoryArray.map(
      item =>
        item.params === currentCategory &&
        item.id > 3 &&
        categoryBarRef.current!.scrollTo(
          selectedCategory.current!.offsetLeft,
          0,
        ),
    );
  }, []);

  return (
    <div className="travelmenu-wrapper">
      <div className="kuddyspicksearchbar-wrapper">
        <BackIcon onClick={() => nav("/")} />
        <div
          className="kuddyspicksearchbar-rect"
          onClick={() => nav(`/travel/search${window.location.search}`)}
        >
          <form>
            <input
              readOnly
              value={currentKeyword !== null ? currentKeyword : undefined}
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
              currentCategory === null && item.params === ""
                ? "rect selected"
                : currentCategory === item.params
                ? "rect selected"
                : "rect"
            }
            ref={currentCategory === item.params ? selectedCategory : null}
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
      {currentDistrict !== null && (
        <div className="district-bar">
          {currentDistrict.split(" ").map(item => (
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
      <div className="block-container">
        {searchedList &&
          (searchedList.length === 0 ? (
            <div className="empty">
              <div className="no-result">No result</div>
              <p>Try searching differently</p>
            </div>
          ) : (
            <>
              {searchedList.map(item => (
                <TravelBlock {...item} key={item.contentId} />
              ))}
            </>
          ))}
      </div>
    </div>
  );
};

export default TravelPage;
