import "./mates-block.scss";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// 네비게이트 path 수정 필요
const MatesBlock = ({
  nickname,
  introduce,
  profileImage,
  role,
  kuddyLevel,
  allInterests,
}: MatesType) => {
  const nav = useNavigate();
  const profileContainer = useRef<HTMLDivElement>(null);
  const interestContainer = useRef<HTMLDivElement>(null);
  const [isOveflow, setIsOverflow] = useState<boolean>(false);
  useEffect(() => {
    if (profileContainer.current && interestContainer.current)
      if (
        profileContainer.current!.offsetWidth -
          interestContainer.current!.offsetLeft -
          interestContainer.current!.offsetWidth <
        0
      )
        setIsOverflow(true);
  }, [allInterests]);
  return (
    <div
      className="mates-block-container"
      onClick={() => nav(`/profile/${nickname}`)}
      ref={profileContainer}
    >
      <div className="profile-circle">
        <img src={profileImage} alt={nickname} />
      </div>
      <div className="text-section">
        <div className="name-container">
          <div className="name">{nickname}</div>
          {role === "KUDDY" && (
            <div className="circle">{role === "KUDDY" ? kuddyLevel : null}</div>
          )}
        </div>
        <div className="introduce">{introduce ? introduce : "-"}</div>
        <div className="interests-container" ref={interestContainer}>
          {isOveflow
            ? allInterests.splice(0, 2).map(item => (
                <div className="interests" key={item}>
                  {item}
                </div>
              ))
            : allInterests.map((item, idx) => (
                <div className="interests" key={item + idx}>
                  {item}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default MatesBlock;
