import "./profile-detail-page.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "@components/ProfileDetailPage/NavBar";
import IntroSection from "@components/ProfileDetailPage/IntroSection";
import AboutBuddySection from "@components/ProfileDetailPage/AboutBuddySection";
import ReviewSection from "@components/ProfileDetailPage/ReviewSection";
import { useGetProfileByName } from "@services/hooks/profile";

const ProfileDetailPage = () => {
  const nickname = useParams().nickname;
  const [profile, setProfile] = useState();
  const onGetProfileByName = useGetProfileByName();

  useEffect(() => {
    const getProfileByName = async () => {
      const res = await onGetProfileByName(nickname || "");
      setProfile(res);
    };

    getProfileByName();
  }, []);

  return (
    <div className="profile-detail-container">
      <NavBar />
      <IntroSection profile={profile} />
      <AboutBuddySection profile={profile} />
      <ReviewSection profile={profile} />
    </div>
  );
};

export default ProfileDetailPage;
