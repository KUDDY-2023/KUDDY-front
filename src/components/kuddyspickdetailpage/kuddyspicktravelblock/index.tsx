import "./kuddyspicktravelblock.scss";
import { KuddysPickDetailContentType } from "@components/kuddyspickdetailpage/kuddyspickdetailmenu/index";
import { ReactComponent as BookmarkIcon } from "@assets/travelpage/bookmark.svg";
import { useState, useEffect } from "react";
import useBookmark from "@utils/hooks/useBookmark";

const KuddysPickTravelBlock = ({ travel }: KuddysPickDetailContentType) => {
  const { id, name, district, category, thumbnail } = travel;
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  useEffect(() => {
    const likedList = [{ id: 93877 }, { id: 2 }].map(row => row.id);
    setIsBookmarked(isLogin === false ? false : likedList.includes(id));
  }, []);
  const { state, toggle } = useBookmark(isBookmarked, id);
  return (
    <div className="kuddyspicktravelblock-wrapper">
      <div className="kuddyspickpreview-content-rect">
        <div className="kuddyspickpreview-content-img-rect">
          <img src={thumbnail} alt={name} />
        </div>
        <div className="kuddyspickpreview-content-text">
          <div className="name">{name}</div>
          <div className="description">{`${district} · ${category}`}</div>
        </div>
        <div className="pick-icon-container">
          <BookmarkIcon
            onClick={isLogin ? toggle : () => alert("Login to pick")}
            stroke="var(--color-black)"
            fill={state ? "var(--color-main-yellow)" : "var(--color-white)"}
          />
        </div>
      </div>
    </div>
  );
};

export default KuddysPickTravelBlock;
