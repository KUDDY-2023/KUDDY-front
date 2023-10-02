import "./trending.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TravelBlock from "@components/Travel/TravelBlock";
import { ReactComponent as ArrowIcon } from "@assets/icon/home_text_arrow.svg";

import { spotGetTrendingNow } from "@services/api/spot";

const Trending = () => {
  const nav = useNavigate();
  const [trendingPlace, setTrendingPlace] = useState<TravelPreviewType[]>([]);

  useEffect(() => {
    spotGetTrendingNow()
      .then(res => setTrendingPlace(res.data.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <div className="trending-header">
        <div className="trending-title">Trending now</div>
        <div className="trending-more" onClick={() => nav("/travel/list")}>
          <p>more</p>
          <ArrowIcon />
        </div>
      </div>
      <div className="trending-container">
        {trendingPlace.map(item => (
          <TravelBlock key={item.contentId} {...item} />
        ))}
        <div className="end"></div>
      </div>
    </>
  );
};

export default Trending;
