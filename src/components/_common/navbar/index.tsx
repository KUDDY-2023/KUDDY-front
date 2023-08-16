import "./navbar.scss";
import { NavLink } from "react-router-dom";
import { ReactComponent as HomeIcon } from "@assets/homepage/home.svg";
import { ReactComponent as PickIcon } from "@assets/homepage/pick.svg";
import { ReactComponent as MatesIcon } from "@assets/homepage/mates.svg";
import { ReactComponent as CommunityIcon } from "@assets/homepage/community.svg";

// 현재 페이지 path에 따른 UI(색상) 변화 구현 필요
const NavBar = () => {
  return (
    <div className="container">
      <div className="inner-container">
        <NavLink to="/" className="click-area">
          <HomeIcon />
          <div className="text">HOME</div>
        </NavLink>
        <NavLink to="/pick" className="click-area">
          <PickIcon />
          <div className="text">PICK</div>
        </NavLink>
        <NavLink to="/mates" className="click-area">
          <MatesIcon />
          <div className="text">MATES</div>
        </NavLink>
        <NavLink to="/community" className="click-area">
          <CommunityIcon />
          <div className="text">COMMUNITY</div>
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
