import "./navbar.scss";
import { NavLink } from "react-router-dom";
import { ReactComponent as HomeIcon } from "@assets/homepage/home.svg";
import { ReactComponent as PickIcon } from "@assets/homepage/pick.svg";
import { ReactComponent as MatesIcon } from "@assets/homepage/mates.svg";
import { ReactComponent as CommunityIcon } from "@assets/homepage/community.svg";

const NavBar = () => {
  // path 수정 필요
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
        <NavLink to="/community" className="nav-click-area">
          <CommunityIcon />
          <div className="nav-text">COMMUNITY</div>
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
