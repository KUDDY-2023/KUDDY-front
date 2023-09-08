import "./menu.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  handleMenuClick: (menu: MenuType) => void;
};

const Menu = ({ handleMenuClick }: Props) => {
  const nav = useNavigate();
  const [menu, setMenu] = useState<MenuType>("itinerary-feedback");

  useEffect(() => {
    nav(`?category=${menu}`);
  }, [menu]);

  return (
    <div className="menu-container">
      <div className="menu-btn-container">
        <div
          className={
            menu === "itinerary-feedback" ? "select-btn active" : "select-btn"
          }
          onClick={() => {
            setMenu("itinerary-feedback");
            handleMenuClick("itinerary-feedback");
          }}
        >
          Itinerary Feedback
        </div>
        <div
          className={
            menu === "talking-board" ? "select-btn active" : "select-btn"
          }
          onClick={() => {
            setMenu("talking-board");
            handleMenuClick("talking-board");
          }}
        >
          Talking Board
        </div>
      </div>
    </div>
  );
};

export default Menu;
