import "./menu.scss";
import { useNavigate } from "react-router-dom";
import menuimg1 from "@assets/homepage/menu/attraction.svg";
import menuimg2 from "@assets/homepage/menu/culture.svg";
import menuimg3 from "@assets/homepage/menu/shopping.svg";
import menuimg4 from "@assets/homepage/menu/restaurant.svg";
import menuimg5 from "@assets/homepage/menu/leisure.svg";
import menuimg6 from "@assets/homepage/menu/festival.svg";
import menuimg7 from "@assets/homepage/menu/youtube.svg";
import menuimg8 from "@assets/homepage/menu/location.svg";

const Menu = () => {
  const nav = useNavigate();
  return (
    <div className="menu-wrapper">
      <div className="menu-inner-wrapper">
        {menus.map(item => (
          <div
            className="menu-container"
            key={item.index}
            onClick={() => nav(item.path)}
          >
            <div className="menu-rect" style={{ backgroundColor: item.color }}>
              <img src={item.img} />
            </div>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;

type menu = {
  index: number;
  name: string;
  color: string;
  img: string;
  path: string;
};

const menus: menu[] = [
  {
    index: 1,
    name: "attraction",
    color: "#FFF9D7",
    img: menuimg1,
    path: "/travel?category=attraction",
  },
  {
    index: 2,
    name: "culture",
    color: "#ECFFEE",
    img: menuimg2,
    path: "/travel?category=culture",
  },
  {
    index: 3,
    name: "shopping",
    color: "#FFF2FE",
    img: menuimg3,
    path: "/travel?category=shopping",
  },
  {
    index: 4,
    name: "restaurant",
    color: "#EEF2FF",
    img: menuimg4,
    path: "/travel?category=restaurant",
  },
  {
    index: 5,
    name: "leisure",
    color: "#EAF6FF",
    img: menuimg5,
    path: "/travel?category=leisure",
  },
  {
    index: 6,
    name: "festival",
    color: "#FFF0F5",
    img: menuimg6,
    path: "/travel?category=festival",
  },
  {
    index: 7,
    name: "youtube",
    color: "#FFEDED",
    img: menuimg7,
    path: "/youtube",
  },
  {
    index: 8,
    name: "location",
    color: "#EEFFDD",
    img: menuimg8,
    path: "/location",
  },
];
