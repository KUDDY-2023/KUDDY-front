import "./review-section.scss";
import { useState, useEffect } from "react";
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
      setReviews(res);
    };

    getReviews();
  }, [profile]);

  return (
    <div className="review-section-container">
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

      {reviews?.reviewResDto?.map((review: any) => {
        return (
          <ReviewBox key={review?.id} review={review} role={profile?.role} />
        );
      })}
    </div>
  );
};

export default ReviewSection;
