import "./profile-detail-page.scss";
import { KuddyUserData, TravelerUserData } from "@utils/data/userProfile";
import { useParams } from "react-router-dom";
import NavBar from "@components/ProfileDetailPage/NavBar";
import IntroSection from "@components/ProfileDetailPage/IntroSection";
import AboutBuddySection from "@components/ProfileDetailPage/AboutBuddySection";
import ReviewSection from "@components/ProfileDetailPage/ReviewSection";

const ProfileDetailPage = () => {
  const nickname = useParams().nickname;

  // 임의
  let Props;
  switch (nickname) {
    case "ian":
      Props = KuddyUserData;
      break;
    case "harper":
      Props = TravelerUserData;
  }

  return (
    <div className="profile-detail-container">
      <NavBar />
      <IntroSection {...Props} />
      <AboutBuddySection />
      <ReviewSection />
    </div>
  );
};

export default ProfileDetailPage;
