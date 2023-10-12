import "./intro-section.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import level1Icon from "@assets/level/level1.svg";
import level2Icon from "@assets/level/level2.svg";
import level3Icon from "@assets/level/level3.svg";
import level4Icon from "@assets/level/level4.svg";
import verified from "@assets/profile/verified.svg";
import notVerified from "@assets/profile/not_verified.svg";
import edit from "@assets/profile/edit.svg";
import { useGetRoomStatus } from "@services/hooks/chat";
import useInterest from "@utils/hooks/useInterest";

type Props = {
  profile: any;
  isMine: boolean;
};

// 공통 : 닉네임, 프로필사진, 소개글, interest
// kuddy: 가이드 등급
// traveler: 인증 여부
const IntroSection = ({ profile, isMine }: Props) => {
  const interestKey = [
    "artBeauty",
    "careerMajor",
    "entertainment",
    "food",
    "hobbiesInterests",
    "lifestyle",
    "sports",
  ];
  const [interestText, setInterestText] = useState<string[]>([]);
  const nav = useNavigate();
  const onGetRoomStatus = useGetRoomStatus(); // 채팅방 여부 조회 (없으면 채팅방 생성)
  const { altElement } = useInterest();
  let badgeText, badgeIcon;

  switch (profile?.role) {
    case "KUDDY":
      badgeText = profile?.kuddyLevel;

      switch (profile?.kuddyLevel) {
        case "EXPLORER":
          badgeIcon = level4Icon;
          break;
        case "FRIEND":
          badgeIcon = level3Icon;
          break;
        case "COMPANION":
          badgeIcon = level2Icon;
          break;
        case "SOULMATE":
          badgeIcon = level1Icon;
      }
      break;

    case "TRAVELER":
      if (profile?.ticketStatus === "Submitted") {
        badgeText = "Verified";
        badgeIcon = verified;
      } else {
        badgeText = "Not verified";
        badgeIcon = notVerified;
      }
  }

  // interest 관련
  useEffect(() => {
    let newValues: string[] = [];
    const foods = ["KOREAN", "CHINESE", "ITALIAN", "MEXICAN", "JAPANESE"];

    for (let i = 0; i < interestKey.length; i++) {
      const temp = profile?.interests?.[interestKey[i]]?.map((v: any) => {
        if (v !== "NOT_SELECTED") {
          if (i === 3 && foods.includes(v)) {
            v = v + " " + "food";
          }
          return v;
        }
      });

      for (let j = 0; j < temp?.length; j++) {
        if (temp[j] !== undefined) {
          newValues.push(temp[j]);
        }
      }
    }

    setInterestText(newValues);
  }, [profile]);

  const handleBtnClick = async () => {
    if (isMine) {
      nav("/profile/modify");
    } else {
      // 채팅 페이지로 이동
      const res = await onGetRoomStatus(
        profile?.memberInfo?.email,
        profile?.memberInfo?.nickname,
      );
      const roomId = Number(res.roomId);
      nav(`/chat/${roomId}`);
    }
  };

  return (
    <div className="intro-section-container">
      <div className="user-profile-container">
        <img
          className="user-profile-img"
          src={profile?.memberInfo?.profileImageUrl}
          alt="프로필 사진"
        />
        <div className="user-profile-right-section">
          <div className="nickname-section">
            <div className="nickname">{profile?.memberInfo?.nickname}</div>
            <div className="badge-section">
              <img src={badgeIcon} />
              <div className="badge-text">{badgeText}</div>
            </div>
          </div>
          <div className="profile-btn" onClick={handleBtnClick}>
            {isMine && <img src={edit} />}
            {isMine ? "edit" : "Send message"}
          </div>
        </div>
      </div>

      {profile?.introduce && (
        <div className="introduction-content">{profile?.introduce}</div>
      )}
      {profile?.interests && (
        <div className="interest-list">
          {interestText?.map((item, index) => {
            return (
              <div key={index} className="interest-item">
                {item && altElement(item)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default IntroSection;
