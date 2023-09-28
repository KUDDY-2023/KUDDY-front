import "./mates-block.scss";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Level1Icon } from "@assets/level/level1.svg";
import { ReactComponent as Level2Icon } from "@assets/level/level2.svg";
import { ReactComponent as Level3Icon } from "@assets/level/level3.svg";
import { ReactComponent as Level4Icon } from "@assets/level/level4.svg";

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
          110 <
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

  const [searchParams, setSearchParams] = useSearchParams();

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
            <div className="circle">
              {role === "KUDDY" ? (
                kuddyLevel === "EXPLORER" ? (
                  <Level1Icon />
                ) : kuddyLevel === "FRIEND" ? (
                  <Level2Icon />
                ) : kuddyLevel === "COMPANION" ? (
                  <Level3Icon />
                ) : kuddyLevel === "SOULMATE" ? (
                  <Level4Icon />
                ) : null
              ) : null}
            </div>
          )}
        </div>
        <div className="introduce">{introduce ? introduce : "-"}</div>
        <div className="interests-container" ref={interestContainer}>
          {slicedInterests.map((item, idx) => (
            <div
              className={isSliced ? "interests" : "interests slicing"}
              style={{
                backgroundColor:
                  searchParams.get("interest") === item.toLowerCase()
                    ? "var(--color-main-yellow)"
                    : "var(--color-light-grey)",
              }}
              key={item + idx}
            >
              {item.toLowerCase()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatesBlock;
