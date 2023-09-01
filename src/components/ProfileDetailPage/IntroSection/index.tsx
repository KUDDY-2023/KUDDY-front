import "./intro-section.scss";
import guideGrade from "@assets/profile/guid_grade.svg";
import verified from "@assets/profile/verified.svg";
import notVerified from "@assets/profile/not_verified.svg";
import edit from "@assets/profile/edit.svg";

// 공통 : 닉네임, 프로필사진, 소개글, interest
// kuddy: 가이드 등급
// traveler: 인증 여부
const IntroSection = ({ ...props }) => {
  let isMine = false; // 임의
  let badgeText, badgeIcon;
  switch (props.role) {
    case "kuddy":
      badgeText = props.guidGrade;
      badgeIcon = guideGrade;
      break;
    case "traveler":
      if (props.ticketStatus === "Submitted") {
        badgeText = "Verified";
        badgeIcon = verified;
      } else {
        badgeText = "Not verified";
        badgeIcon = notVerified;
      }
  }

  return (
    <div className="intro-section-container">
      <div className="user-profile-container">
        <img
          className="user-profile-img"
          src={props.profileImage}
          alt="프로필 사진"
        />
        <div className="user-profile-right-section">
          <div className="nickname-section">
            <div className="nickname">{props.nickname}</div>
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

      <div className="introduction-content">{props.introduction}</div>
      {props.interest && (
        <div className="interest-list">
          {[
            "photo",
            "running",
            "walking",
            "basketball",
            "baseball",
            "coffee",
          ].map((item, index) => {
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
