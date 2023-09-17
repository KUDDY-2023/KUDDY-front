import "./travel-block.scss";
import { ReactComponent as BookmarkIcon } from "@assets/icon/bookmark.svg";
import defaultthumbnail from "@assets/location/default_thumbnail.jpeg";
import { useNavigate } from "react-router-dom";

type TravelBlockProps = {
  contentId: number;
  name: string;
  district: string;
  category: string;
  imageUrl: string;
  isNearby?: boolean | undefined;
  isPick?: boolean | undefined; // 픽한 장소 모아보기에서만 true, 아닐땐 생략
  onDelete?: (value: any) => void; // 픽한 장소 모아보기에서만 전달
};

// 1:1 이미지 + 이름 + 구로 이루어진 하나의 장소 블록
const TravelBlock = ({
  contentId,
  name,
  district,
  category,
  imageUrl,
  isNearby,
  isPick,
  onDelete,
}: TravelBlockProps) => {
  const nav = useNavigate();
  return (
    <div className="travelblock-wrapper">
      <div className="block" onClick={() => nav(`/travel/${contentId}`)}>
        <div className="img-rect">
          <img src={imageUrl === "" ? defaultthumbnail : imageUrl} alt={name} />
        </div>
        <div className="name">{name}</div>
        <div className="district">
          {isNearby === true ? category : district}
        </div>
      </div>
      {isPick ? (
        <div className="click-area">
          <BookmarkIcon
            fill="var(--color-main-yellow)"
            stroke="var(--color-black)"
            onClick={onDelete}
          />
        </div>
      ) : null}
    </div>
  );
};

export default TravelBlock;
