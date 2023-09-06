import menuimg1 from "@assets/home/attraction.svg";
import menuimg2 from "@assets/home/culture.svg";
import menuimg3 from "@assets/home/shopping.svg";
import menuimg4 from "@assets/home/restaurant.svg";
import menuimg5 from "@assets/home/leisure.svg";
import menuimg6 from "@assets/home/festival.svg";
import menuimg7 from "@assets/home/youtube.svg";
import menuimg8 from "@assets/home/location.svg";

type menu = {
  index: number;
  name: string;
  color: string;
  img: string;
  path: string;
};

export const menus: menu[] = [
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
    path: "/location/map",
  },
];
