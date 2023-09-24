import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./swiper-card.scss";
import { kuddyspickGetSwiperCard } from "@services/api/kuddyspick";

type SwiperInfoType = {
  id: number;
  title: string;
  thumbnail: string;
};

const SwiperCard = () => {
  const nav = useNavigate();
  const [swiperInfo, setSwiperInfo] = useState<SwiperInfoType[]>();
  useEffect(() => {
    kuddyspickGetSwiperCard()
      .then(res => setSwiperInfo(res.data.data.thumbnailList))
      .catch();
  }, []);

  return (
    <div className="swiper-card-wrapper">
      {swiperInfo && (
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={8}
          centeredSlides={true}
          loop={true}
        >
          {swiperInfo.map(item => (
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
      )}
    </div>
  );
};

export default SwiperCard;
