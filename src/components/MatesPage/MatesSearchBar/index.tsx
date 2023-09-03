import "./mates-search-bar.scss";
import "@components/HomePage/HomeSearchBar/home-search-bar.scss";
import { ReactComponent as SearchIcon } from "@assets/icon/search.svg";
import filtericon from "@assets/icon/filter.svg";
import { ReactComponent as RefreshIcon } from "@assets/icon/refresh.svg";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const filterArray = ["gender", "language", "district", "interest"];

const MatesSearchBar = () => {
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

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
    filterArray.map(item => searchParams.delete(item));
    setSearchParams(searchParams);
  };

  const [currentKeyword, setCurrentKeyword] = useState<string | null>(
    searchParams.get("keyword"),
  );

  return (
    <div className="mates-search-bar-wrapper">
      <form
        className="homesearchbar-box"
        onClick={() => nav(`/mates/search${window.location.search}`)}
      >
        <SearchIcon stroke="var(--color-black)" />
        <input
          readOnly
          value={currentKeyword !== null ? currentKeyword : undefined}
          placeholder={`Find your own buddy!`}
        />
        <div
          className="filter-circle"
          style={{
            backgroundColor: isFiltered
              ? "var(--color-main-yellow)"
              : "var(--color-white)",
          }}
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
                  {searchParams.get(item) &&
                    searchParams
                      .get(item)
                      ?.replace(/^[a-z]/, char => char.toUpperCase())}
                </div>
              ),
          )}
        </div>
      )}
    </div>
  );
};

export default MatesSearchBar;
