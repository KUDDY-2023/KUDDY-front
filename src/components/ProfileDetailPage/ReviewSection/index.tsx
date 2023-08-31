import "./review-section.scss";
import { KuddyReviewData, TravelerReviewData } from "@utils/data/userProfile";
import ReviewBox from "@components/ProfileDetailPage/ReviewBox";

const ReviewSection = ({ ...props }) => {
  let isMine = false; // 임의
  let data = props.role === "kuddy" ? KuddyReviewData : TravelerReviewData; // 임의

  const isKuddy = () => {
    return !isMine && props.role === "kuddy";
  };

  return (
    <div className="review-section-container">
      <div className="review-count-container">
        <div className={isKuddy() ? "review-title kuddy" : "review-title"}>
          {isKuddy() ? "Review" : "Written Review"}
        </div>
        <div
          className={
            props.role === "kuddy"
              ? "review-count-text kuddy"
              : "review-count-text"
          }
        >
          {data.reviewCount}
        </div>
        <div className="meet-title">meet</div>
        <div className="meet-count-text">{data.meetCount}</div>
      </div>

      {data.reviews.map(review => {
        return (
          <ReviewBox key={review.reviewId} isKuddy={isKuddy()} {...review} />
        );
      })}
    </div>
  );
};

export default ReviewSection;
