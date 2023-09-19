import "./intro-section.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import guideGrade from "@assets/profile/guid_grade.svg";
import verified from "@assets/profile/verified.svg";
import notVerified from "@assets/profile/not_verified.svg";
import edit from "@assets/profile/edit.svg";

type Props = {
  profile: any;
};

// 공통 : 닉네임, 프로필사진, 소개글, interest
// kuddy: 가이드 등급
// traveler: 인증 여부
const IntroSection = ({ profile }: Props) => {
  const interestKey = [
    "wellbeing",
    "activitiesInvestmentTech",
    "careerMajor",
    "entertainment",
    "hobbiesInterests",
    "lifestyle",
    "artBeauty",
    "food",
    "sports",
  ];
  const [interestText, setInterestText] = useState<string[]>([]);
  const nav = useNavigate();
  let isMine = profile?.mine;
  let badgeText, badgeIcon;

  switch (profile?.role) {
    case "KUDDY":
      badgeText = profile?.kuddyLevel;
      badgeIcon = guideGrade;
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

    for (let i = 0; i < interestKey.length; i++) {
      const temp = profile?.interests?.[interestKey[i]].map((v: any) => {
        if (v !== "NOT_SELECTED") {
          return v.toLowerCase();
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

  const handleBtnClick = () => {
    if (isMine) {
      nav("/profile/modify");
    } else {
      // 채팅 페이지로 이동
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
          <div className="profile-btn">
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
                {item}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default IntroSection;
