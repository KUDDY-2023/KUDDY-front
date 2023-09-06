import "./location-list-block.scss";
import { useNavigate } from "react-router-dom";
import { LocationPreviewBlockProps } from "../LocationPreviewBlock";

const LocationListBlock = ({
  contentId,
  name,
  category,
  district,
  imageUrl,
}: LocationPreviewBlockProps) => {
  const nav = useNavigate();
  return (
    <div className="location-list-block-wrapper">
      <div className="rect" onClick={() => nav(`/travel/${contentId}`)}>
        <div className="img-rect">
          <img src={imageUrl} />
        </div>
        <div className="text-container">
          <div className="category">
            <p>{category}</p>
          </div>
          <div className="name">{name}</div>
          <div className="district">{district}</div>
        </div>
      </div>
    </div>
  );
};

export default LocationListBlock;
