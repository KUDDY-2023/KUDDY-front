import "./image-view.scss";
import "swiper/swiper.scss";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";
import backIcon from "@assets/icon/back.svg";
import trashBtn from "@assets/community/trash_btn.svg";
import { joinUsPostState, othersPostState } from "@services/store/community";

interface Props {
  photoInfo: string[];
  clickedIndex: number;
  onClose(): void;
  hasTrashBtn?: boolean;
  isJoinUs?: boolean;
}

const ImageView = ({
  photoInfo,
  clickedIndex,
  onClose,
  hasTrashBtn,
  isJoinUs,
}: Props) => {
  const [totalIndex, setTotalIndex] = useState<number>(photoInfo?.length);
  const [curIndex, setCurIndex] = useState<number>(clickedIndex);
  const [joinUsPost, setJoinUsPost] = useRecoilState(joinUsPostState);
  const [othersPost, setOthersPost] = useRecoilState(othersPostState);

  const handleTrashBtnClick = () => {
    if (isJoinUs) {
      setJoinUsPost({
        ...joinUsPost,
        images: joinUsPost.images.filter((image, index) => index !== curIndex),
      });
    } else {
      setOthersPost({
        ...othersPost,
        images: othersPost.images.filter((image, index) => index !== curIndex),
      });
    }

    setTotalIndex(totalIndex - 1);
  };

  useEffect(() => {
    setCurIndex(clickedIndex);
  }, []);

  useEffect(() => {
    console.log(totalIndex);
    if (totalIndex <= 0) {
      onClose();
    }
  }, [totalIndex]);

  return (
    <div className="image-view-container">
      <div className="image-view-navbar">
        <img src={backIcon} onClick={onClose} />
        <div className="image-index">
          {curIndex + 1} / {totalIndex}
        </div>
      </div>

      <Swiper
        className="image-view-slide-container"
        slidesPerView={"auto"}
        spaceBetween={0}
        initialSlide={clickedIndex}
        onSlideChangeTransitionStart={swiperCore => {
          setCurIndex(swiperCore.activeIndex);
        }}
      >
        {photoInfo.map((item, index) => (
          <SwiperSlide className="image-view-slide" key={index}>
            <img src={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      {hasTrashBtn && (
        <img
          className="trash-btn"
          src={trashBtn}
          onClick={handleTrashBtnClick}
        />
      )}
    </div>
  );
};

export default ImageView;
