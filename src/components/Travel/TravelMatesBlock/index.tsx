import "./travel-mates-block.scss";
import { useNavigate } from "react-router-dom";

const TravelMatesBlock = ({
  memberId,
  nickname,
  introduce,
  profileImageUrl,
}: PickedMatesType) => {
  const nav = useNavigate();
  return (
    <div
      className="travel-mates-block-container"
      onClick={() => nav(`/profile/${nickname}`)}
    >
      <div className="img-circle">
        <img src={profileImageUrl} alt={nickname} />
      </div>
      <div className="text-section">
        <div className="name">{nickname}</div>
        <div className="description">{introduce ? introduce : "-"}</div>
      </div>
    </div>
  );
};

export default TravelMatesBlock;
