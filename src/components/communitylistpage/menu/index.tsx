import "./menu.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const nav = useNavigate();
  const [menu, setMenu] = useState<MenuType>("itinerary-feedback"); // 선택한 메뉴 ("feedback" | "talking")

  const handleMenuClick = (clickedMenu: MenuType) => {
    menu !== clickedMenu && setMenu(clickedMenu);
  };

  useEffect(() => {
    nav(`?category=${menu}`);
  }, [menu]);

  return (
    <div className="menu-container">
      <div className="menu-btn-container">
        <div
          className={
            menu === "itinerary-feedback" ? "menu-btn clicked" : "menu-btn"
          }
          onClick={() => handleMenuClick("itinerary-feedback")}
        >
          Itinerary Feedback
        </div>
        <div
          className={menu === "talking-board" ? "menu-btn clicked" : "menu-btn"}
          onClick={() => handleMenuClick("talking-board")}
        >
          Talking Board
        </div>
      </div>
    </div>
  );
};

export default Menu;
