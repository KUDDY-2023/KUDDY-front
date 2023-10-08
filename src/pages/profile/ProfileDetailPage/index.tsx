import "./profile-detail-page.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "@components/ProfileDetailPage/NavBar";
import IntroSection from "@components/ProfileDetailPage/IntroSection";
import AboutBuddySection from "@components/ProfileDetailPage/AboutBuddySection";
import ReviewSection from "@components/ProfileDetailPage/ReviewSection";
import Loading from "@components/_common/Loading";
import { useGetProfileByName } from "@services/hooks/profile";
import { useGetProfile } from "@services/hooks/profile";
import {
  useGetKuddyReviews,
  useGetTravelerReviews,
} from "@services/hooks/community";

const ProfileDetailPage = () => {
  const nickname = useParams().nickname;
  const [profile, setProfile] = useState<any>();
  const [isMine, setIsMine] = useState(false);
  const onGetProfileByName = useGetProfileByName();
  const onGetKuddyReviews = useGetKuddyReviews();
  const onGetTravelerReviews = useGetTravelerReviews();
  const { data, isLoading, error } = useGetProfile();
  const [reviews, setReviews] = useState<any>();

  useEffect(() => {
    const getProfileByName = async () => {
      const res = await onGetProfileByName(nickname || "");
      setProfile(res);
    };

    getProfileByName();
  }, []);

  useEffect(() => {
    if (data) {
      const res = data.data.data;
      res?.memberInfo?.memberId === profile?.memberInfo?.memberId
        ? setIsMine(true)
        : setIsMine(false);
    }
  }, [isLoading, profile]);

  useEffect(() => {
    if (!!profile) {
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
    }
  }, [profile]);

  return (
    <div className="profile-detail-container">
      <NavBar
        profileId={Number(profile?.memberInfo?.memberId)}
        isMine={isMine}
      />
      {!profile || !reviews ? (
        <Loading backColor="transparent" spinnerColor="#eee" size="30px" />
      ) : (
        <>
          <IntroSection profile={profile} isMine={isMine} />
          <AboutBuddySection profile={profile} />
          <ReviewSection profile={profile} reviews={reviews} />
        </>
      )}
    </div>
  );
};

export default ProfileDetailPage;
