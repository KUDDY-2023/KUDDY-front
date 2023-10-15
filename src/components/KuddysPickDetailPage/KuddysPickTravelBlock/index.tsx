import "./kuddys-pick-travel-block.scss";
import defaultthumbnail from "@assets/location/default_travel_thumbnail.svg";
import { ReactComponent as BookmarkIcon } from "@assets/icon/bookmark.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBookmark from "@utils/hooks/useBookmark";
import { useRecoilValue } from "recoil";
import { pickedTravel } from "@services/store/travel";
import { isLoginState } from "@services/store/auth";

const KuddysPickTravelBlock = ({
  contentId,
  name,
  district,
  category,
  imageUrl,
}: KuddysPickDetailContentType) => {
  const nav = useNavigate();
  const isLogin = useRecoilValue<boolean>(isLoginState);
  const myPickList = useRecoilValue<TravelPreviewType[]>(pickedTravel);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const { state, toggle } = useBookmark(isBookmarked, contentId);
  useEffect(() => {
    setIsBookmarked(
      isLogin === false
        ? false
        : myPickList.map(row => row.contentId).includes(contentId),
    );
  }, [myPickList]);
  return (
    <div className="kuddyspicktravelblock-wrapper">
      <div
        className="kuddyspickpreview-content-rect"
        onClick={() => nav(`/travel/${contentId}`)}
      >
        <div className="kuddyspickpreview-content-img-rect">
          <img src={imageUrl === "" ? defaultthumbnail : imageUrl} alt={name} />
        </div>
        <div className="kuddyspickpreview-content-text">
          <div className="name">{name}</div>
          <div className="description">{`${district} · ${category}`}</div>
        </div>
      </div>
      <div className="pick-icon-container" onClick={toggle}>
        <BookmarkIcon
          stroke="var(--color-black)"
          fill={state ? "var(--color-main-yellow)" : "var(--color-white)"}
        />
      </div>
    </div>
  );
};

export default KuddysPickTravelBlock;
