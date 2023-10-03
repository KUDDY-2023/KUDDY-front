import "./youtube-page.scss";
import "@pages/travel/TravelPage/travel-page.scss";
import { useEffect, useState } from "react";
import BackNavBar from "@components/_common/BackNavBar";
import { ktubeList } from "./_mock";

const YoutubePage = () => {
  const [currentCategroy, setCurrentCategory] = useState<string>("K-Tour");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="travelmenu-wrapper youtube-page-wrapper">
      <BackNavBar middleTitle="K-tube" isShare={false} />
      <div className="category-bar">
        {ktubeList.map((item, idx) => (
          <div
            className={
              currentCategroy === item.category ? "rect selected" : "rect"
            }
            key={item.id}
            onClick={() => setCurrentCategory(item.category)}
            style={{
              marginRight: idx === ktubeList.length - 1 ? "25px" : "0",
            }}
          >
            {item.category}
          </div>
        ))}
      </div>
      <div className="list-container">
        {ktubeList.map(item =>
          item.category === currentCategroy
            ? item.youtube.map(el => (
                <div key={el.id}>
                  <iframe src={el.url} />
                  <div className="youtube-title">{el.title}</div>
                </div>
              ))
            : null,
        )}
      </div>
    </div>
  );
};

export default YoutubePage;
