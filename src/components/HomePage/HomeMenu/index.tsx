import "./home-menu.scss";
import { menus } from "@components/HomePage/HomeMenu/_mock";
import { useNavigate } from "react-router-dom";

const HomeMenu = () => {
  const nav = useNavigate();
  return (
    <div className="homemenu-wrapper">
      <div className="homemenu-inner-wrapper">
        {menus.map(item => (
          <div className="homemenu-container" key={item.index}>
            <div
              className="homemenu-rect"
              style={{ backgroundColor: item.color }}
              onClick={() => nav(item.path)}
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
