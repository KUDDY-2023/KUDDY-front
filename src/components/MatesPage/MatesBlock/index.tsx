import "./mates-block.scss";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Level1Icon } from "@assets/level/level1.svg";
import { ReactComponent as Level2Icon } from "@assets/level/level2.svg";
import { ReactComponent as Level3Icon } from "@assets/level/level3.svg";
import { ReactComponent as Level4Icon } from "@assets/level/level4.svg";
import useInterest from "@utils/hooks/useInterest";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const { altElement } = useInterest();

  return (
    <div
      className="mates-block-container"
      onClick={() => nav(`/profile/${nickname}`)}
    >
      <div className="profile-circle">
        <img src={profileImage} alt={nickname} />
      </div>
      <div className="text-section">
        <div className="name-container">
          {role === "KUDDY" && (
            <div className="circle">
              {role === "KUDDY" ? (
                kuddyLevel === "EXPLORER" ? (
                  <Level4Icon />
                ) : kuddyLevel === "FRIEND" ? (
                  <Level3Icon />
                ) : kuddyLevel === "COMPANION" ? (
                  <Level2Icon />
                ) : kuddyLevel === "SOULMATE" ? (
                  <Level1Icon />
                ) : null
              ) : null}
            </div>
          )}
          <div className="name">{nickname}</div>
        </div>
        <div className="introduce">{introduce ? introduce : "-"}</div>
        <div className="interests-container">
          {allInterests &&
            allInterests.map((item, idx) => (
              <div
                className="interests"
                style={{
                  backgroundColor:
                    searchParams.get("interest") === item.toLowerCase()
                      ? "var(--color-main-yellow)"
                      : "var(--color-light-grey)",
                }}
                key={item + idx}
              >
                {item && altElement(item)}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MatesBlock;
