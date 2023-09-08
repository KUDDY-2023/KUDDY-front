import "./travel-detail-title.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBookmark from "@utils/hooks/useBookmark";
import { ReactComponent as BookmarkIcon } from "@assets/icon/bookmark.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/swiper.scss";
import ImageView from "@components/CommunityDetailPage/ImageView";

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
  heart,
  kuddyList,
  travelerList,
}: TravelDetailType) => {
  const nav = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  useEffect(() => {
    const likedList = [{ id: 50928 }, { id: 2 }].map(row => row.id);
    setIsBookmarked(isLogin === false ? false : likedList.includes(contentId));
  }, []);
  const { state, toggle } = useBookmark(isBookmarked, contentId);

  const [matesPreview, setMatesPreview] = useState<string[]>([""]);
  useEffect(() => {
    if (kuddyList.concat(travelerList).length > 5)
      setMatesPreview(
        kuddyList
          .concat(travelerList)
          .sort(() => Math.random() - 0.5)
          .slice(0, 5)
          .map(row => row.profileImageUrl),
      );
    else
      setMatesPreview(
        kuddyList
          .concat(travelerList)
          .sort(() => Math.random() - 0.5)
          .map(row => row.profileImageUrl),
      );
  }, [kuddyList, travelerList]);

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
          <div className="number">{heart}</div>
        </div>
        <BookmarkIcon
          onClick={isLogin ? toggle : () => alert("Login to pick")}
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
