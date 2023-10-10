import "./home-search-bar.scss";
import { ReactComponent as SearchIcon } from "@assets/icon/search.svg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useResetRecoilState } from "recoil";
import { travelFilter } from "@services/store/travel";

const HomeSearchBar = () => {
  const nav = useNavigate();
  const resetTravelFilter = useResetRecoilState(travelFilter);
  useEffect(() => {
    resetTravelFilter();
  }, []);
  return (
    <div className="homesearchbar-wrapper">
      <div className="homesearchbar-box" onClick={() => nav("/travel/list")}>
        <SearchIcon stroke="var(--color-black)" />
        <p>Everything for your travel</p>
      </div>
    </div>
  );
};

export default HomeSearchBar;
