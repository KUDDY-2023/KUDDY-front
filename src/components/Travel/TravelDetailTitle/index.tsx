import "./travel-detail-title.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBookmark from "@utils/hooks/useBookmark";
import { ReactComponent as BookmarkIcon } from "@assets/icon/bookmark.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/swiper.scss";
import ImageView from "@components/_common/ImageView";
import { useRecoilValue } from "recoil";
import { pickedTravel } from "@services/store/travel";
import { useGetPick, useDetailPickedMates } from "@services/hooks/pick";
import { isLoginState } from "@services/store/auth";

type ImageViewType = {
  isOpen: boolean;
  index: number;
  imgUrl: string;
};

const TravelDetailTitle = ({
  contentId,
  imageList,
  name,
  district,
  category,
  kuddyList,
  travelerList,
}: TravelDetailType) => {
  const nav = useNavigate();
  const isLogin = useRecoilValue<boolean>(isLoginState);
  const myPickList = useRecoilValue<TravelPreviewType[]>(pickedTravel);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const { state, toggle } = useBookmark(isBookmarked, contentId);
  const getPick = useGetPick();
  const { heart, matesPreview, setTrigger } = useDetailPickedMates(
    contentId,
    "ALL",
  );

  useEffect(() => {
    getPick();
    setTrigger(Date.now());
    setIsBookmarked(
      isLogin === false
        ? false
        : myPickList.map(row => row.contentId).includes(contentId),
    );
  }, [contentId]);

  useEffect(() => {
    setTrigger(Date.now());
  }, [state]);

  SwiperCore.use([Autoplay]);
  const [imageView, setImageView] = useState<ImageViewType>({
    isOpen: false,
    index: 0,
    imgUrl: "",
  });

  return (
    <div className="travel-detail-title-wrapper">
      <div className="img-rect">
        <Swiper
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          {imageList.map((src, idx) => (
            <SwiperSlide
              key={src}
              onClick={() =>
                setImageView({ isOpen: true, index: idx, imgUrl: src })
              }
            >
              <img alt={src} src={src} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="title">{name}</div>
      <div className="sub-title">{`${district} · ${category}`}</div>
      <div className="flex-container">
        <div
          className="mates-container"
          onClick={() => nav(`/travel/${contentId}/mates`)}
        >
          {matesPreview &&
            (matesPreview.length === 0 ? (
              <div className="notyet">Be first mate picked here!</div>
            ) : (
              <div
                className="profile-circle-container"
                style={{ width: `${20 * matesPreview.length + 10}px` }}
              >
                {matesPreview.map((item, idx) => (
                  <div
                    className="profile-circle"
                    style={{ zIndex: idx, left: idx * 20 }}
                    key={item}
                  >
                    <img src={item} />
                  </div>
                ))}
              </div>
            ))}
          {matesPreview && matesPreview.length !== 0 && (
            <div className="number">{heart}</div>
          )}
        </div>
        <BookmarkIcon
          onClick={toggle}
          stroke="var(--color-black)"
          fill={state ? "var(--color-main-yellow)" : "var(--color-white)"}
        />
      </div>
      {imageView.isOpen && (
        <ImageView
          photoInfo={imageList}
          clickedIndex={imageView.index}
          onClose={() => setImageView({ ...imageView, isOpen: false })}
        />
      )}
    </div>
  );
};

export default TravelDetailTitle;
