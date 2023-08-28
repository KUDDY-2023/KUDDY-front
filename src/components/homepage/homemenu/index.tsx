import "./home-menu.scss";
import { useNavigate } from "react-router-dom";
import menuimg1 from "@assets/icon/HomeMenu/attraction.svg";
import menuimg2 from "@assets/icon/HomeMenu/culture.svg";
import menuimg3 from "@assets/icon/HomeMenu/shopping.svg";
import menuimg4 from "@assets/icon/HomeMenu/restaurant.svg";
import menuimg5 from "@assets/icon/HomeMenu/leisure.svg";
import menuimg6 from "@assets/icon/HomeMenu/festival.svg";
import menuimg7 from "@assets/icon/HomeMenu/youtube.svg";
import menuimg8 from "@assets/icon/HomeMenu/location.svg";

const HomeMenu = () => {
  const nav = useNavigate();
  return (
    <div className="homemenu-wrapper">
      <div className="homemenu-inner-wrapper">
        {menus.map(item => (
          <div
            className="homemenu-container"
            key={item.index}
            onClick={() => nav(item.path)}
          >
            <div
              className="homemenu-rect"
              style={{ backgroundColor: item.color }}
            >
              <img src={item.img} />
            </div>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeMenu;

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
    path: "/travel/list?category=attraction",
  },
  {
    index: 2,
    name: "culture",
    color: "#ECFFEE",
    img: menuimg2,
    path: "/travel/list?category=culture",
  },
  {
    index: 3,
    name: "shopping",
    color: "#FFF2FE",
    img: menuimg3,
    path: "/travel/list?category=shopping",
  },
  {
    index: 4,
    name: "restaurant",
    color: "#EEF2FF",
    img: menuimg4,
    path: "/travel/list?category=restaurant",
  },
  {
    index: 5,
    name: "leisure",
    color: "#EAF6FF",
    img: menuimg5,
    path: "/travel/list?category=leisure",
  },
  {
    index: 6,
    name: "festival",
    color: "#FFF0F5",
    img: menuimg6,
    path: "/travel/list?category=festival",
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
