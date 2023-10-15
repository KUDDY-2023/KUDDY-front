import "./travel-detail-title.scss";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useBookmark from "@utils/hooks/useBookmark";
import defaultthumbnail from "@assets/location/default_travel_thumbnail.svg";
import { ReactComponent as BookmarkIcon } from "@assets/icon/bookmark.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/swiper.scss";
import ImageView from "@components/_common/ImageView";
import { useRecoilValue } from "recoil";
import { pickedTravel } from "@services/store/travel";
import { isLoginState } from "@services/store/auth";

type ImageViewType = {
  isOpen: boolean;
  index: number;
  imgUrl: string;
};
type TravelDetailTitleProps = {
  imageList: string[];
  name: string;
  district: string;
  category: string;
  heart: number;
  matesPreview: string[];
  refetch: () => void;
};

const TravelDetailTitle = ({
  imageList,
  name,
  district,
  category,
  heart,
  matesPreview,
  refetch,
}: TravelDetailTitleProps) => {
  const nav = useNavigate();
  const { id } = useParams();

  const isLogin = useRecoilValue<boolean>(isLoginState);
  const myPickList = useRecoilValue<TravelPreviewType[]>(pickedTravel);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(
    isLogin === false
      ? false
      : myPickList.map(row => row.contentId).includes(Number(id)),
  );
  useEffect(() => {
    setIsBookmarked(
      isLogin === false
        ? false
        : myPickList.map(row => row.contentId).includes(Number(id)),
    );
  }, [myPickList, id]);

  const { state, toggle } = useBookmark(isBookmarked, Number(id));
  useEffect(() => {
    if (isBookmarked !== state) refetch();
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
        {imageList.length === 0 ? (
          <img src={defaultthumbnail} />
        ) : (
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
        )}
      </div>
      <div className="title">{name}</div>
      <div className="sub-title">{`${district} · ${category}`}</div>
      <div className="flex-container">
        <div
          className="mates-container"
          onClick={() => nav(`/travel/${Number(id)}/users`)}
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
