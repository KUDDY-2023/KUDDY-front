import "./profile-detail-page.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "@components/ProfileDetailPage/NavBar";
import IntroSection from "@components/ProfileDetailPage/IntroSection";
import AboutBuddySection from "@components/ProfileDetailPage/AboutBuddySection";
import ReviewSection from "@components/ProfileDetailPage/ReviewSection";
import { useGetProfileByName } from "@services/hooks/profile";
import { useGetProfile } from "@services/hooks/profile";

const ProfileDetailPage = () => {
  const nickname = useParams().nickname;
  const [profile, setProfile] = useState<any>();
  const [isMine, setIsMine] = useState(false);
  const onGetProfileByName = useGetProfileByName();
  const { data, isLoading, error } = useGetProfile();

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

  return (
    <div className="profile-detail-container">
      <NavBar
        profileId={Number(profile?.memberInfo?.memberId)}
        isMine={isMine}
      />
      <IntroSection profile={profile} isMine={isMine} />
      <AboutBuddySection profile={profile} />
      <ReviewSection profile={profile} />
    </div>
  );
};

export default ProfileDetailPage;
