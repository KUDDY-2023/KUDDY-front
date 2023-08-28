import "./image-view.scss";
import "swiper/swiper.scss";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import backIcon from "@assets/icon/back.svg";

interface Props {
  photoInfo: PhotoType[];
  clickedIndex: number;
  onClose(): void;
}

const ImageView = ({ photoInfo, clickedIndex, onClose }: Props) => {
  const [curIndex, setCurIndex] = useState<number>(clickedIndex);

  return (
    <div className="image-view-container">
      <div className="image-view-navbar">
        <img src={backIcon} onClick={onClose} />
        <div className="image-index">
          {curIndex} / {photoInfo.length}
        </div>
      </div>

      <Swiper
        className="image-view-slide-container"
        slidesPerView={"auto"}
        spaceBetween={0}
        initialSlide={clickedIndex}
        onSlideChangeTransitionStart={swiperCore => {
          setCurIndex(swiperCore.activeIndex + 1);
        }}
      >
        {photoInfo.map(item => (
          <SwiperSlide className="image-view-slide" key={item.photoId}>
            <img src={item.src} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageView;
