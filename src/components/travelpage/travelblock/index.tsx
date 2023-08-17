import "./travelblock.scss";
import { ReactComponent as BookmarkIcon } from "@assets/travelpage/bookmark.svg";
import { useNavigate } from "react-router-dom";

type TravelBlockProps = {
  id: number;
  name: string;
  district: string;
  img: string;
  isPick?: boolean | undefined; // 픽한 장소 모아보기에서만 true, 아닐땐 생략
};

// 1:1 이미지 + 이름 + 구로 이루어진 하나의 장소 블록
const TravelBlock = ({ id, name, district, img, isPick }: TravelBlockProps) => {
  const nav = useNavigate();
  return (
    <div className="travelblock-block" onClick={() => nav(`/travel/${id}`)}>
      <div className="travelblock-img-rect">
        <img src={img} alt={name} />
      </div>
      <div className="travelblock-name">{name}</div>
      <div className="travelblock-district">{district}</div>
      {isPick ? (
        <BookmarkIcon
          fill="var(--color-main-yellow)"
          stroke="var(--color-main-yellow)"
        />
      ) : null}
    </div>
  );
};

export default TravelBlock;
