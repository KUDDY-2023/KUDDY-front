import "./location-preview-block.scss";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currentPosition } from "@services/store/travel";
import { ReactComponent as ListIcon } from "@assets/location/list.svg";
import defaultthumbnail from "@assets/location/default_travel_thumbnail.svg";

export type LocationPreviewBlockProps = {
  contentId: number;
  name: string;
  category: string;
  district: string;
  imageUrl: string;
};

const LocationPreviewBlock = ({
  contentId,
  name,
  category,
  district,
  imageUrl,
}: LocationPreviewBlockProps) => {
  const nav = useNavigate();
  const pos = useRecoilValue<Position>(currentPosition);
  return (
    <div className="location-preview-block-wrapper">
      <div className="list-btn-wrapper">
        <div
          className="list-btn"
          onClick={() => nav(`/location/list?x=${pos.x}&y=${pos.y}`)}
        >
          <ListIcon />
          <p>List</p>
        </div>
      </div>
      <div className="rect" onClick={() => nav(`/travel/${contentId}`)}>
        <div className={imageUrl ? "img-rect" : "img-rect default"}>
          <img src={imageUrl ? imageUrl : defaultthumbnail} />
          <div className="category">{category}</div>
        </div>
        <div className="text-container">
          <div className="name">{name}</div>
          <div className="district">{district}</div>
        </div>
      </div>
    </div>
  );
};

export default LocationPreviewBlock;
