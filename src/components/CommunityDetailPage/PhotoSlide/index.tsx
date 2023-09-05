import "./photo-slide.scss";
import "swiper/swiper.scss";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ImageView from "@components/CommunityDetailPage/ImageView";

const PhotoSlide = () => {
  const [imageViewOpen, setImageViewOpen] = useState<boolean>(false); // 사진 뷰 띄움 여부
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const [photoInfo, setPhotoInfo] = useState<PhotoType[]>([
    {
      photoId: 1,
      src: "https://homecuisine.co.kr/files/attach/images/140/001/083/558d170258752df2dd76bef00861497f.JPG",
    },
    {
      photoId: 2,
      src: "https://homecuisine.co.kr/files/attach/images/140/890/106/e4c935050f606a96407eeb9bd96ba090.jpg",
    },
    {
      photoId: 3,
      src: "https://static.wtable.co.kr/image/production/service/recipe/762/ee6abd30-9069-4fe5-becf-d2c437ffb612.jpg",
    },
  ]);

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
        {photoInfo.map(item => (
          <SwiperSlide
            className="photo-slide"
            key={item.photoId}
            onClick={() => handlePhotoClick(item.photoId)}
          >
            <img src={item.src} />
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
