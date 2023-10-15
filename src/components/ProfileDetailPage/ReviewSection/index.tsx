import "./review-section.scss";
import { useNavigate, useParams } from "react-router-dom";
import ReviewBox from "@components/ProfileDetailPage/ReviewBox";

type Props = {
  profile: any;
  reviews: any;
};

const ReviewSection = ({ profile, reviews }: Props) => {
  const nickname = useParams().nickname;
  const nav = useNavigate();

  return (
    <div className="review-section-container" onClick={() => nav("reviews")}>
      <div className="review-count-container">
        <div className="meet-title">meetings</div>
        <div className="meet-count-text">{reviews?.meetupCount}</div>
        <div
          className={
            profile?.role === "KUDDY" ? "review-title kuddy" : "review-title"
          }
        >
          {profile?.role === "KUDDY" ? "Reviews" : "Traveler's Reviews"}
        </div>
        <div
          className={
            profile?.role === "KUDDY"
              ? "review-count-text kuddy"
              : "review-count-text"
          }
        >
          {reviews?.reviewCount}
        </div>
      </div>

      {reviews?.reviewResDto
        ?.filter((review: any, idx: number) => {
          return idx < 5;
        })
        .map((review: any) => {
          return (
            <ReviewBox key={review?.id} review={review} role={profile?.role} />
          );
        })}
    </div>
  );
};

export default ReviewSection;
