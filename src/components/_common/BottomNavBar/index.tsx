import "./bottom-nav-bar.scss";
import { NavLink } from "react-router-dom";
import { ReactComponent as HomeIcon } from "@assets/icon/BottomNavBar/home.svg";
import { ReactComponent as PickIcon } from "@assets/icon/BottomNavBar/pick.svg";
import { ReactComponent as MatesIcon } from "@assets/icon/BottomNavBar/mates.svg";
import { ReactComponent as CommunityIcon } from "@assets/icon/BottomNavBar/community.svg";

const BottomNavBar = () => {
  return (
    <div className="nav-container">
      <div className="nav-inner-container">
        <NavLink to="/" className="nav-click-area">
          <HomeIcon />
          <div className="nav-text">HOME</div>
        </NavLink>
        <NavLink to="/pick" className="nav-click-area">
          <PickIcon />
          <div className="nav-text">PICK</div>
        </NavLink>
        <NavLink to="/mates" className="nav-click-area">
          <MatesIcon />
          <div className="nav-text">MATES</div>
        </NavLink>
        <NavLink to="/community/list" className="nav-click-area">
          <CommunityIcon />
          <div className="nav-text">COMMUNITY</div>
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNavBar;
