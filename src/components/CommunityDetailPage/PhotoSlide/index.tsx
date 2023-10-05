import "./photo-slide.scss";
import "swiper/swiper.scss";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ImageView from "@components/_common/ImageView";

type Props = {
  photoInfo: any;
};

const PhotoSlide = ({ photoInfo }: Props) => {
  const [imageViewOpen, setImageViewOpen] = useState<boolean>(false); // 사진 뷰 띄움 여부
  const [photoIndex, setPhotoIndex] = useState<number>(0);

  const handlePhotoClick = (index: number) => {
    setImageViewOpen(true);
    setPhotoIndex(index);
  };

  return (
    <>
      <Swiper
        className="photo-slide-container"
        slidesPerView={"auto"}
        spaceBetween={6}
      >
        {photoInfo.map((item: any, index: number) => (
          <SwiperSlide
            className="photo-slide"
            key={index}
            onClick={() => handlePhotoClick(index)}
          >
            <img src={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 사진 클릭 시 사진 뷰 띄움 */}
      {imageViewOpen && (
        <ImageView
          photoInfo={photoInfo}
          clickedIndex={photoIndex}
          onClose={() => setImageViewOpen(false)}
        />
      )}
    </>
  );
};

export default PhotoSlide;
