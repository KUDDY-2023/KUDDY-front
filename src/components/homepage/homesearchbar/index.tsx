import "./homesearchbar.scss";
import { ReactComponent as SearchIcon } from "@assets/icon/search.svg";
import { useNavigate } from "react-router-dom";

const HomeSearchBar = () => {
  const nav = useNavigate();
  return (
    <div className="homesearchbar-wrapper">
      <div className="homesearchbar-box" onClick={() => nav("/travel/search")}>
        <SearchIcon stroke="var(--color-black)" />
        <p>Everything for your travel</p>
      </div>
    </div>
  );
};

export default HomeSearchBar;
