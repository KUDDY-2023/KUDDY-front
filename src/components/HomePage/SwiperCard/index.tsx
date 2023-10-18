import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import { useNavigate } from "react-router-dom";
import "./swiper-card.scss";
import Loading from "@components/_common/Loading";
import { kuddyspickGetSwiperCard } from "@services/api/kuddyspick";
import { useQuery } from "react-query";

type SwiperInfoType = {
  id: number;
  title: string;
  thumbnail: string;
};

const SwiperCard = () => {
  const nav = useNavigate();
  const { data, isLoading } = useQuery(
    ["swiperCard"],
    kuddyspickGetSwiperCard,
    {
      staleTime: 1800000,
      cacheTime: Infinity,
      retry: 3,
    },
  );
  return (
    <div className="swiper-card-wrapper">
      {isLoading ? (
        <div className="loading-container">
          <Loading backColor="transparent" spinnerColor="#eee" size="30px" />
        </div>
      ) : (
        data &&
        data.data.data.thumbnailList.length !== 0 && (
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={8}
            centeredSlides={true}
            loop={true}
          >
            {data &&
              data.data.data.thumbnailList.map((item: SwiperInfoType) => (
                <SwiperSlide
                  key={item.id}
                  onClick={() => nav(`/kuddys-pick/${item.id}`)}
                >
                  <div className="swiper-img-rect">
                    <img src={item.thumbnail} />
                    <div className="swiper-img-gradient"></div>
                  </div>
                  <div className="swiper-text-container">
                    <div className="swiper-text small">KUDDY's Pick</div>
                    <div className="swiper-text">{item.title}</div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        )
      )}
    </div>
  );
};

export default SwiperCard;
