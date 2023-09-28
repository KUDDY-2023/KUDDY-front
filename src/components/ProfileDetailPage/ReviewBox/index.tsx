import "./review-box.scss";
import { useEffect } from "react";

type Props = {
  review: any;
  role: string;
};

const ReviewBox = ({ review, role }: Props) => {
  const createdDate = new Date(review?.createdDate).toLocaleDateString();

  return role === "KUDDY" ? (
    <div className="review-content-container kuddy">
      <div className="review-grade-kuddy">
        <div className="review-date-text">{createdDate}</div>
        <div className="review-grade-box">{review?.grade}</div>
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
          <div className="review-date-text">{createdDate}</div>
        </div>
        <img src={review?.kuddyInfo?.profileImageUrl} />
      </div>
    </div>
  );
};

export default ReviewBox;
