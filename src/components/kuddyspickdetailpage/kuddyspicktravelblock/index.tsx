import "./kuddyspicktravelblock.scss";
import { KuddysPickDetailContentType } from "@components/kuddyspickdetailpage/kuddyspickdetailmenu/index";
import { ReactComponent as BookmarkIcon } from "@assets/travelpage/bookmark.svg";
import { useState, useEffect } from "react";

const KuddysPickTravelBlock = ({ travel }: KuddysPickDetailContentType) => {
  const { id, name, district, category, thumbnail } = travel;
  const [isLogin, setIsLogin] = useState<boolean>(false);
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
          <BookmarkIcon onClick={() => console.log("pick")} />
        </div>
      </div>
    </div>
  );
};

export default KuddysPickTravelBlock;
