import "./review-box.scss";
import { useEffect } from "react";

type Props = {
  review: any;
  role: string;
};

const ReviewBox = ({ review, role }: Props) => {
  const createdDate = new Date(review?.createdDate)
    .toLocaleString("sv")
    .split(" ", 1);

  // 리뷰 만족도 텍스트
  const handleGrade = (grade: string) => {
    switch (grade) {
      case "Perfect":
        return "Excellent";
      case "Disappoint":
        return "Disappointing";
      default:
        return grade;
    }
  };

  return role === "KUDDY" ? (
    <div className="review-content-container kuddy">
      <div className="review-grade-kuddy">
        <div className="review-date-text">
          {createdDate[0].replaceAll("-", ".")}
        </div>
        <div className="review-grade-box">{handleGrade(review?.grade)}</div>
      </div>
      <img src={review?.writerInfo?.profileImageUrl} />
      <div className="review-nickname-text kuddy">
        <strong>{review?.writerInfo?.nickname}</strong>
      </div>
      <div className="review-content-text kuddy">{review?.content}</div>
    </div>
  ) : (
    <div className="review-content-container">
      <div className="review-content-text traveler">{review?.content}</div>
      <div className="review-profile-traveler">
        <div className="review-profile-inner-traveler">
          <div className="review-nickname-text traveler">
            with <strong>{review?.kuddyInfo?.nickname}</strong>
          </div>
          <div className="review-date-text">
            {createdDate[0].replaceAll("-", ".")}
          </div>
        </div>
        <img src={review?.kuddyInfo?.profileImageUrl} />
      </div>
    </div>
  );
};

export default ReviewBox;
