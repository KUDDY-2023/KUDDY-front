import "./review-list-page.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "@components/_common/Loading";
import BackNavBar from "@components/_common/BackNavBar";
import GradeBar from "@components/ReviewListPage/GradeBar";
import ReviewItem from "@components/ReviewListPage/ReviewItem";
import { useGetProfileByName, useGetProfile } from "@services/hooks/profile";
import {
  useGetKuddyReviews,
  useGetTravelerReviews,
} from "@services/hooks/community";
import { useDeleteReview } from "@services/hooks/profile";

const ReviewListPage = () => {
  const nickname = useParams().nickname;
  const [profile, setProfile] = useState<any>(); // 해당 유저 프로필
  const [reviews, setReviews] = useState<any>();
  const { data, isLoading, error } = useGetProfile(); // 내 프로필
  const onGetProfileByName = useGetProfileByName();
  const onGetKuddyReviews = useGetKuddyReviews();
  const onGetTravelerReviews = useGetTravelerReviews();

  // 해당 유저 프로필
  useEffect(() => {
    const getProfileByName = async () => {
      const res = await onGetProfileByName(nickname || "");
      setProfile(res);
    };

    getProfileByName();
  }, []);

  // 리뷰 저장
  const getReviews = async () => {
    let res;
    if (profile?.role === "KUDDY") {
      res = await onGetKuddyReviews(profile?.memberInfo?.memberId);
    } else if (profile?.role === "TRAVELER") {
      res = await onGetTravelerReviews(profile?.memberInfo?.memberId);
    }
    setReviews(res);
  };

  useEffect(() => {
    if (!!profile) {
      getReviews();
    }
  }, [profile]);

  // 리뷰 삭제 버튼 클릭
  const onDeleteReview = useDeleteReview();

  const handleDeleteClick = async (id: number) => {
    const res = await onDeleteReview(id);
    getReviews(); // 리뷰 리스트 다시 불러오기
  };

  return (
    <div className="reveiw-list-page-container">
      {!profile || !reviews ? (
        <Loading backColor="transparent" spinnerColor="#eee" size="30px" />
      ) : (
        <>
          <BackNavBar middleTitle="" isShare={false} />
          <div className="review-list-title">
            {profile?.role === "KUDDY"
              ? `Review ${reviews?.reviewCount}`
              : `Traveler's Review ${reviews?.reviewCount}`}
          </div>
          {profile?.role === "KUDDY" && (
            <GradeBar
              perfect={reviews?.perfect}
              good={reviews?.good}
              disappoint={reviews?.disappoint}
            />
          )}

          <div
            className={`review-list-container ${profile?.role.toLowerCase()}`}
          >
            {reviews.reviewResDto?.map((review: any) => {
              return (
                <ReviewItem
                  key={review.id}
                  role={profile?.role}
                  review={review}
                  isMine={
                    data?.data.data.memberInfo.memberId ===
                    review?.writerInfo.memberId
                  }
                  onDelete={() => handleDeleteClick(review?.id)}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewListPage;
