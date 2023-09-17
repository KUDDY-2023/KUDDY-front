import "./review-section.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetKuddyReviews,
  useGetTravelerReviews,
} from "@services/hooks/community";
import ReviewBox from "@components/ProfileDetailPage/ReviewBox";

type Props = {
  profile: any;
};

const ReviewSection = ({ profile }: Props) => {
  const [reviews, setReviews] = useState<any>();
  const onGetKuddyReviews = useGetKuddyReviews();
  const onGetTravelerReviews = useGetTravelerReviews();

  useEffect(() => {
    const getReviews = async () => {
      let res;
      if (profile?.role === "KUDDY") {
        res = await onGetKuddyReviews(profile?.memberInfo?.memberId);
      } else if (profile?.role === "TRAVELER") {
        res = await onGetTravelerReviews(profile?.memberInfo?.memberId);
      }

      console.log("리뷰" + res);
      setReviews(res);
    };

    getReviews();
  }, [profile]);

  return (
    <div className="review-section-container">
      <div className="review-count-container">
        <div
          className={
            profile?.role === "KUDDY" ? "review-title kuddy" : "review-title"
          }
        >
          {profile?.role === "KUDDY" ? "Review" : "Written Review"}
        </div>
        <div
          className={
            profile?.role === "kuddy"
              ? "review-count-text kuddy"
              : "review-count-text"
          }
        >
          {reviews?.reviewCount}
        </div>
        <div className="meet-title">meet</div>
        <div className="meet-count-text">{reviews?.meetupCount}</div>
      </div>

      {reviews?.reviewResDto?.map((review: any) => {
        return <ReviewBox key={review?.id} {...review} />;
      })}
    </div>
  );
};

export default ReviewSection;
