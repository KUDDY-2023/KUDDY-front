import "./searchbar.scss";
import { ReactComponent as SearchIcon } from "@assets/icon/search.svg";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const nav = useNavigate();
  return (
    <div className="searchbar-wrapper">
      <div className="searchbar-box" onClick={() => nav("/travel/search")}>
        <SearchIcon stroke="var(--color-black)" />
        <p>Everything for your travel</p>
      </div>
    </div>
  );
};

export default SearchBar;
