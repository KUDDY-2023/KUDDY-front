import "./menu.scss";
import { useRecoilState } from "recoil";
import { postMenuState } from "@services/store/community";

type Props = {
  handleMenuClick: (menu: MenuType) => void;
};

const Menu = ({ handleMenuClick }: Props) => {
  const [menuType, setMenuType] = useRecoilState(postMenuState);

  return (
    <div className="menu-container">
      <div className="menu-btn-container">
        <div
          className={
            menuType === "itinerary" ? "select-btn active" : "select-btn"
          }
          onClick={() => {
            setMenuType("itinerary");
            handleMenuClick("itinerary");
          }}
        >
          Route Feedback
        </div>
        <div
          className={
            menuType === "talkingboard" ? "select-btn active" : "select-btn"
          }
          onClick={() => {
            setMenuType("talkingboard");
            handleMenuClick("talkingboard");
          }}
        >
          Open Forum
        </div>
      </div>
    </div>
  );
};

export default Menu;
