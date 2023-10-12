import TopBar from "@components/_common/TopBar/index";
import BottomNavBar from "@components/_common/BottomNavBar/index";
import SwiperCard from "@components/HomePage/SwiperCard/index";
import HomeSearchBar from "@components/HomePage/HomeSearchBar/index";
import Trending from "@components/HomePage/Trending/index";
import HomeMenu from "@components/HomePage/HomeMenu/index";
import WeeklyUser from "@components/HomePage/WeeklyUser/index";
import KuddysPickPreview from "@components/HomePage/KuddysPickPreview/index";
import Ad from "@components/HomePage/Ad/index";
import Landing from "@components/HomePage/Landing";
import Modal from "@components/_common/Modal";
import ReviewModal from "@components/HomePage/ReviewModal";

import { useEffect, useState } from "react";
import { useIsFirstLogin } from "@services/hooks/auth";
import { useReviewModal } from "@services/hooks/user";

const HomePage = () => {
  useIsFirstLogin("MAIN");

  const { isModal, meetupId } = useReviewModal();
  const [reviewModal, setReviewModal] = useState<boolean>(false);
  useEffect(() => {
    setReviewModal(isModal);
  }, [isModal]);

  const [isSplash, setIsSplash] = useState<boolean>(false);
  useEffect(() => {
    // test
    const CLIENT_MAIN_URL = process.env.REACT_APP_REACT_URL;
    console.log("url test: " + CLIENT_MAIN_URL);

    window.scrollTo(0, 0);
    if (sessionStorage.getItem("visited") !== "true") {
      setIsSplash(true);
      setTimeout(function () {
        setIsSplash(false);
        sessionStorage.setItem("visited", "true");
      }, 2000);
    } else {
      setIsSplash(false);
    }
  }, []);

  return (
    <>
      {isSplash ? (
        <Landing />
      ) : (
        <>
          <TopBar />
          <SwiperCard />
          <HomeSearchBar />
          <Trending />
          <HomeMenu />
          <WeeklyUser />
          <KuddysPickPreview />
          <Ad />
          <BottomNavBar />
          {reviewModal && meetupId && (
            <Modal
              isOpen={reviewModal}
              closer={() => setReviewModal(false)}
              isXbtn={true}
            >
              <ReviewModal meetupId={meetupId} />
            </Modal>
          )}
        </>
      )}
    </>
  );
};

export default HomePage;
