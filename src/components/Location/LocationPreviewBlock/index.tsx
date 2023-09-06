import "./location-preview-block.scss";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ListIcon } from "@assets/location/list.svg";

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
  return (
    <div className="location-preview-block-wrapper">
      <div className="list-btn-wrapper">
        <div className="list-btn" onClick={() => nav("/location/list")}>
          <ListIcon />
          <p>List</p>
        </div>
      </div>
      <div className="rect" onClick={() => nav(`/travel/${contentId}`)}>
        <div className="img-rect">
          <img src={imageUrl} />
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
