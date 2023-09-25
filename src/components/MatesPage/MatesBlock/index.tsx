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
  const [slicedInterests, setSlicedInterests] =
    useState<string[]>(allInterests);
  const profileContainer = useRef<HTMLDivElement>(null);
  const interestContainer = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  const [isSliced, setIsSliced] = useState<boolean>(false);

  const detectOverflow = () => {
    if (profileContainer.current && interestContainer.current)
      if (
        profileContainer.current!.offsetWidth -
          interestContainer.current!.offsetLeft -
          interestContainer.current!.offsetWidth +
          120 <
        0
      )
        setIsOverflow(true);
      else {
        setIsOverflow(false);
        setIsSliced(true);
      }
  };
  useEffect(() => {
    detectOverflow();
  }, [slicedInterests]);

  useEffect(() => {
    isOverflow
      ? setSlicedInterests(slicedInterests.slice(0, slicedInterests.length - 1))
      : setSlicedInterests(slicedInterests);
  }, [slicedInterests, isOverflow]);

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
          {slicedInterests.map((item, idx) => (
            <div
              className={isSliced ? "interests" : "interests slicing"}
              key={item + idx}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatesBlock;
