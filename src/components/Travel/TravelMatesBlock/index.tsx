import "./travel-mates-block.scss";

// 한줄 소개 타입에 추가 필요
const TravelMatesBlock = ({
  id,
  nickname,
  profileImageUrl,
}: PickedMatesType) => {
  return (
    <div className="travel-mates-block-container">
      <div className="img-circle">
        <img src={profileImageUrl} alt={nickname} />
      </div>
      <div className="text-section">
        <div className="name">{nickname}</div>
        <div className="description">
          I love the nature of Seoul I love the nature of Seoul I love the
          nature of Seoul.
        </div>
      </div>
    </div>
  );
};

export default TravelMatesBlock;
