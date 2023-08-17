import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./swipercard.scss";

type SwiperInfoType = {
  id: number;
  title: string;
  src: string;
};

const SwiperCard = () => {
  const nav = useNavigate();
  const [swiperInfo, setSwiperInfo] = useState<SwiperInfoType[]>([
    {
      id: 1,
      title: "10 The best view point for Han-River",
      src: "https://me.go.kr/hg/file/preview.do?fileId=187108&fileSeq=1",
    },
    {
      id: 2,
      title: "The Most Picked Jamsil Spot",
      src: "https://blog.kakaocdn.net/dn/xIoxp/btrB5V8Gf2a/LMWasLuAC6tkdo8hauzm10/img.jpg",
    },
    {
      id: 3,
      title: "10 The best view point for Han-River",
      src: "https://t1.daumcdn.net/cfile/tistory/26312F4A566D4C7028",
    },
  ]);
  const [swiperIndex, setSwiperIndex] = useState<Number>(0);
  useEffect(() => {
    if (swiperIndex === 0 || swiperIndex === swiperInfo.length - 1) {
    }
  }, [swiperIndex]);
  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={8}
        centeredSlides={true}
        onSlideChange={swiperCore => setSwiperIndex(swiperCore.activeIndex)}
      >
        {swiperInfo.map(item => (
          <SwiperSlide
            key={item.id}
            onClick={() => nav(`/kuddys-pick/${item.id}`)}
          >
            <div className="swiper-img-rect">
              <img src={item.src} />
              <div className="swiper-img-gradient"></div>
            </div>
            <div className="swiper-text-container">
              <div className="swiper-text small">KUDDY's Pick</div>
              <div className="swiper-text">{item.title}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperCard;
