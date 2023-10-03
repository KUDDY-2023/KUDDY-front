import "./trending.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TravelBlock from "@components/Travel/TravelBlock";
import { ReactComponent as ArrowIcon } from "@assets/icon/home_text_arrow.svg";

import { spotGetTrendingNow } from "@services/api/spot";
import { useQuery } from "react-query";

const Trending = () => {
  const nav = useNavigate();
  const { data } = useQuery(["trendingNow"], spotGetTrendingNow, {
    staleTime: 1800000,
    cacheTime: Infinity,
  });
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
        {data &&
          data.data.data.map((item: TravelPreviewType) => (
            <TravelBlock key={item.contentId} {...item} />
          ))}
        <div className="end"></div>
      </div>
    </>
  );
};

export default Trending;
