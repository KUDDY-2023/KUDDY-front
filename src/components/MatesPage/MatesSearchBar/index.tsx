import "./mates-search-bar.scss";
import "@components/HomePage/HomeSearchBar/home-search-bar.scss";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import { profileFilter } from "@services/store/profile";
import useInterest from "@utils/hooks/useInterest";
import { ReactComponent as SearchIcon } from "@assets/icon/search.svg";
import filtericon from "@assets/icon/filter.svg";
import { ReactComponent as XBtnIcon } from "@assets/icon/xbtn.svg";
import { ReactComponent as RefreshIcon } from "@assets/icon/refresh.svg";

const filterArray = ["gender", "language", "district", "interest"];

const MatesSearchBar = () => {
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const resetFilter = useResetRecoilState(profileFilter);
  const { altElement } = useInterest();

  useEffect(() => {
    if (
      searchParams.get("gender") ||
      searchParams.get("language") ||
      searchParams.get("district") ||
      searchParams.get("interest")
    )
      setIsFiltered(true);
    else setIsFiltered(false);
  }, [searchParams]);

  const onRefresh = () => {
    resetFilter();
    filterArray.map(item => searchParams.delete(item));
    setSearchParams(searchParams);
  };

  const [currentKeyword, setCurrentKeyword] = useState<string | null>(
    searchParams.get("keyword"),
  );

  return (
    <div className="mates-search-bar-wrapper">
      <form className="homesearchbar-box">
        <SearchIcon stroke="var(--color-black)" />
        <input
          readOnly
          value={currentKeyword !== null ? currentKeyword : ""}
          placeholder={`Find your own buddy!`}
          onClick={() => nav(`/buddy/search${window.location.search}`)}
        />
        {currentKeyword && (
          <XBtnIcon
            className="xbtn"
            onClick={() => {
              searchParams.delete("keyword");
              setSearchParams(searchParams);
              setCurrentKeyword(null);
            }}
          />
        )}
        <div
          className="filter-circle"
          style={{
            backgroundColor: isFiltered
              ? "var(--color-main-yellow)"
              : "var(--color-white)",
          }}
          onClick={() => nav(`/buddy/search${window.location.search}`)}
        >
          <img src={filtericon} />
        </div>
      </form>
      {isFiltered && (
        <div className="filter-bar">
          <RefreshIcon onClick={() => onRefresh()} />
          {filterArray.map(
            item =>
              searchParams.get(item) && (
                <div className="rect">
                  {!!searchParams.get(item) &&
                    (item === "interest"
                      ? altElement(String(searchParams.get(item)).toUpperCase())
                      : searchParams
                          .get(item)!
                          .replace(/^[a-z]/, char => char.toUpperCase()))}
                </div>
              ),
          )}
        </div>
      )}
    </div>
  );
};

export default MatesSearchBar;
