import "./travel-page.scss";
import TravelBlock from "@components/Travel/TravelBlock/index";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ReactComponent as BackIcon } from "@assets/icon/back.svg";
import { ReactComponent as SearchIcon } from "@assets/icon/search.svg";
import { ReactComponent as XIcon } from "@assets/icon/xbtn.svg";

export type TravelType = {
  id: number;
  contentId: number;
  name: string;
  district: string;
  imageUrl: string;
  category: string;
};

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
    if (item.params === null) {
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

  const [searchedList, setSearchedList] = useState<TravelType[]>(travelArray);
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
          onClick={() => nav("/travel/search")}
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
              currentCategory === item.params ? "rect selected" : "rect"
            }
            ref={currentCategory === item.params ? selectedCategory : null}
            key={item.id}
            onClick={() => handleCategory(item)}
            style={{
              marginRight: idx === categoryArray.length - 1 ? "25px" : "0",
            }}
          >
            {item.params === null
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
                <TravelBlock {...item} key={item.id} />
              ))}
            </>
          ))}
      </div>
    </div>
  );
};

export default TravelPage;

export const categoryArray = [
  { id: 0, params: null },
  { id: 1, params: "attraction" },
  { id: 2, params: "culture" },
  { id: 3, params: "shopping" },
  { id: 4, params: "restaurant" },
  { id: 5, params: "leisure" },
  { id: 6, params: "festival" },
];

export const districtArray = [
  { id: 0, params: null },
  { id: 1, params: "gangnam" },
  { id: 2, params: "gangdong" },
  { id: 3, params: "gangbuk" },
  { id: 4, params: "gangseo" },
  { id: 5, params: "gwanak" },
  { id: 6, params: "gwangjin" },
  { id: 7, params: "guro" },
  { id: 8, params: "geumcheon" },
  { id: 9, params: "nowon" },
  { id: 10, params: "dobong" },
  { id: 11, params: "dongdaemun" },
  { id: 12, params: "dongjak" },
  { id: 13, params: "mapo" },
  { id: 14, params: "seodaemun" },
  { id: 15, params: "seocho" },
  { id: 16, params: "seongdong" },
  { id: 17, params: "seongbuk" },
  { id: 18, params: "songpa" },
  { id: 19, params: "yangcheon" },
  { id: 20, params: "yeongdeungpo" },
  { id: 21, params: "yongsan" },
  { id: 22, params: "eunpyeong" },
  { id: 23, params: "jongno" },
  { id: 24, params: "junggu" },
  { id: 25, params: "jungnang" },
];

export const travelArray = [
  {
    id: 1,
    contentId: 1,
    name: "Cheonggyecheon",
    district: "Jongno",
    imageUrl:
      "https://mblogthumb-phinf.pstatic.net/MjAyMDA1MjlfMjU3/MDAxNTkwNzQwNjUwNDAz.LG_RjNhuhqDfES31GQX60XeEZXsohLRWPLXnU3iYxcMg.dVYHAJiv9-rFDEtHxzrS55021Wtdjq0L1jIwlBVPdFkg.PNG.hec_pr/55.png?type=w800",
    category: "attraction",
  },
  {
    id: 2,
    contentId: 1,
    name: "EWHA Womans University",
    district: "Seodaemun",
    imageUrl:
      "https://www.eduinnews.co.kr/news/photo/201804/9074_4551_5956.png",
    category: "",
  },
  {
    id: 3,
    contentId: 1,
    name: "N Seoul Tower",
    district: "Yongsan",
    imageUrl:
      "https://ak-d.tripcdn.com/images/1i65b2215c11x5k3415B1.jpg?proc=source/trip",
    category: "attraction",
  },
  {
    id: 4,
    contentId: 1,
    name: "Cheonggyecheon",
    district: "Jongno",
    imageUrl:
      "https://mblogthumb-phinf.pstatic.net/MjAyMDA1MjlfMjU3/MDAxNTkwNzQwNjUwNDAz.LG_RjNhuhqDfES31GQX60XeEZXsohLRWPLXnU3iYxcMg.dVYHAJiv9-rFDEtHxzrS55021Wtdjq0L1jIwlBVPdFkg.PNG.hec_pr/55.png?type=w800",
    category: "attraction",
  },
  {
    id: 5,
    contentId: 1,
    name: "EWHA Womans University",
    district: "Seodaemun",
    imageUrl:
      "https://www.eduinnews.co.kr/news/photo/201804/9074_4551_5956.png",
    category: "culture",
  },
  {
    id: 6,
    contentId: 1,
    name: "N Seoul Tower",
    district: "Yongsan",
    imageUrl:
      "https://ak-d.tripcdn.com/images/1i65b2215c11x5k3415B1.jpg?proc=source/trip",
    category: "shopping",
  },
  {
    id: 7,
    contentId: 1,
    name: "N Seoul Tower",
    district: "Yongsan",
    imageUrl:
      "https://ak-d.tripcdn.com/images/1i65b2215c11x5k3415B1.jpg?proc=source/trip",
    category: "restaurant",
  },
];
