import "./trending.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TravelBlock from "@components/Travel/TravelBlock";
import { ReactComponent as ArrowIcon } from "@assets/icon/home_text_arrow.svg";

const Trending = () => {
  const nav = useNavigate();
  const [trendingPlace, setTrendingPlace] = useState<TravelPreviewType[]>([
    {
      contentId: 1,
      name: "Cheonggyecheon",
      district: "Jongno",
      category: "",
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMDA1MjlfMjU3/MDAxNTkwNzQwNjUwNDAz.LG_RjNhuhqDfES31GQX60XeEZXsohLRWPLXnU3iYxcMg.dVYHAJiv9-rFDEtHxzrS55021Wtdjq0L1jIwlBVPdFkg.PNG.hec_pr/55.png?type=w800",
    },
    {
      contentId: 2,
      name: "EWHA Womans University",
      district: "Seodaemun",
      category: "",
      imageUrl:
        "https://www.eduinnews.co.kr/news/photo/201804/9074_4551_5956.png",
    },
    {
      contentId: 3,
      name: "N Seoul Tower",
      district: "Yongsan",
      category: "",
      imageUrl:
        "https://ak-d.tripcdn.com/images/1i65b2215c11x5k3415B1.jpg?proc=source/trip",
    },
  ]);
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
