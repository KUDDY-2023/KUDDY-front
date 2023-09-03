import "./mates-block.scss";
import { useNavigate } from "react-router-dom";

// 네비게이트 path 수정 필요
const MatesBlock = ({
  nickname,
  profileImageUrl,
  introduce,
  interests,
}: MatesType) => {
  const nav = useNavigate();
  return (
    <div
      className="mates-block-container"
      onClick={() => nav(`/profile/${nickname}`)}
    >
      <div className="profile-circle">
        <img src={profileImageUrl} alt={nickname} />
      </div>
      <div className="text-section">
        <div className="name-container">
          <div className="name">{nickname}</div>
          <div className="circle"></div>
        </div>
        <div className="introduce">{introduce}</div>
        <div className="interests-container">
          {interests.map(item => (
            <div className="interests" key={item}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatesBlock;
