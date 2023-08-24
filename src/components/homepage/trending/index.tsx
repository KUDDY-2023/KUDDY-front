import "./trending.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TravelType } from "@components/travelpage/travelmenu/index";
import TravelBlock from "@components/travelpage/travelblock";
import { ReactComponent as ArrowIcon } from "@assets/homepage/arrow.svg";

const Trending = () => {
  const nav = useNavigate();
  const [trendingPlace, setTrendingPlace] = useState<TravelType[]>([
    {
      id: 1,
      name: "Cheonggyecheon",
      district: "Jongno",
      thumbnail:
        "https://mblogthumb-phinf.pstatic.net/MjAyMDA1MjlfMjU3/MDAxNTkwNzQwNjUwNDAz.LG_RjNhuhqDfES31GQX60XeEZXsohLRWPLXnU3iYxcMg.dVYHAJiv9-rFDEtHxzrS55021Wtdjq0L1jIwlBVPdFkg.PNG.hec_pr/55.png?type=w800",
      category: "",
    },
    {
      id: 2,
      name: "EWHA Womans University",
      district: "Seodaemun",
      thumbnail:
        "https://www.eduinnews.co.kr/news/photo/201804/9074_4551_5956.png",
      category: "",
    },
    {
      id: 3,
      name: "N Seoul Tower",
      district: "Yongsan",
      thumbnail:
        "https://ak-d.tripcdn.com/images/1i65b2215c11x5k3415B1.jpg?proc=source/trip",
      category: "",
    },
  ]);
  return (
    <>
      <div className="trending-header">
        <div className="trending-title">Trending now</div>
        <div className="trending-more" onClick={() => nav("/travel")}>
          <p>more</p>
          <ArrowIcon />
        </div>
      </div>
      <div className="trending-container">
        {trendingPlace.map(item => (
          <TravelBlock key={item.id} {...item} />
        ))}
        <div className="end"></div>
      </div>
    </>
  );
};

export default Trending;
