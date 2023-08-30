import "./nav-bar.scss";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackIcon } from "@assets/icon/back.svg";
import { ReactComponent as ElseIcon } from "@assets/icon/else_default.svg";

const NavBar = () => {
  const nav = useNavigate();

  const handleGoBack = () => {
    nav(-1);
  };

  const handleElseClick = () => {
    console.log("... 버튼 클릭");
  };

  return (
    <div className="nav-bar-container">
      <BackIcon onClick={handleGoBack} id="back-icon" />
      <ElseIcon onClick={handleElseClick} id="else-icon" />
    </div>
  );
};

export default NavBar;
