import "./travel-search-page.scss";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ReactComponent as BackIcon } from "@assets/icon/back.svg";
import { ReactComponent as SearchIcon } from "@assets/icon/search.svg";
import { categoryArray, districtArray } from "@pages/travel/TravelPage/_mock";

const TravelSearchPage = () => {
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState<string>("");
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const handleCategory = (item: any) => {
    searchParams.set("category", item.params);
    setSearchParams(searchParams);
  };
  const handleDistrict = (item: any) => {
    if (!searchParams.get("district")?.includes(item.params)) {
      if (searchParams.get("district") === null) {
        searchParams.set("district", item.params);
      } else {
        if (!searchParams.get("district")?.includes(item.params))
          searchParams.set(
            "district",
            `${searchParams.get("district")} ${item.params}`,
          );
      }
    } else {
      const filteredArray = searchParams
        .get("district")
        ?.split(" ")
        .filter(array => array !== item.params);
      searchParams.set("district", filteredArray!.join(" "));
      if (searchParams.get("district") === "") searchParams.delete("district");
    }
    setSearchParams(searchParams);
  };
  const handleKeyword = (input: string) => {
    searchParams.set("keyword", input);
    setSearchParams(searchParams);
  };
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput) handleKeyword(searchInput);
    nav(`/travel/list${window.location.search}`);
  };
  return (
    <div className="travelsearch-wrapper">
      <div className="kuddyspicksearchbar-wrapper">
        <BackIcon
          onClick={() => nav(`/travel/list${window.location.search}`)}
        />
        <div className="kuddyspicksearchbar-rect">
          <form onSubmit={handleSubmit}>
            <input
              value={searchInput}
              onChange={handleInput}
              placeholder={`Everything for your travel`}
            />
            <button type="submit">
              <SearchIcon stroke="var(--color-black)" />
            </button>
          </form>
        </div>
      </div>
      <div className="filter-title">Categories</div>
      <div className="filter-container">
        {categoryArray
          .filter(item => item.id !== 0)
          .map(item => (
            <div
              className="travelsearch-filter-rect"
              key={item.id}
              onClick={() => handleCategory(item)}
              style={{
                backgroundColor:
                  searchParams.get("category") === item.params
                    ? "var(--color-main-yellow)"
                    : "var(--color-light-grey)",
              }}
            >
              {item.params === null
                ? null
                : item.params.replace(/^[a-z]/, char => char.toUpperCase())}
            </div>
          ))}
      </div>
      <div className="filter-title">District</div>
      <div className="filter-container">
        {districtArray
          .filter(item => item.id !== 0)
          .map(item => (
            <div
              className="travelsearch-filter-rect"
              key={item.id}
              onClick={() => handleDistrict(item)}
              style={{
                backgroundColor:
                  searchParams.get("district") !== null &&
                  item.params !== null &&
                  searchParams.get("district")!.includes(item.params)
                    ? "var(--color-main-yellow)"
                    : "var(--color-light-grey)",
              }}
            >
              {item.params === null
                ? null
                : item.params.replace(/^[a-z]/, char => char.toUpperCase())}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TravelSearchPage;
