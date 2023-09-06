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
import { profileGetProfile } from "@services/api/profile";

import { useQuery } from "react-query";

const HomePage = () => {
  const { data, isLoading, error, Goto } = useIsFirstLogin("NEW_USER");

  useEffect(() => {
    if (!isLoading) {
      Goto();
    }
  }, [isLoading]);

  const [isSplash, setIsSplash] = useState<boolean>(false);
  useEffect(() => {
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

  // 약속 n시간 후 ~ n일까지 리뷰 작성하러 가기 위한 모달 상태
  // default false
  const [reviewModal, setReviewModal] = useState<boolean>(true);

  return (
    <>
      {isSplash ? (
        <Landing />
      ) : (
        <>
          {isLoading ? (
            <p>로딩 중</p>
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
              {reviewModal && (
                <Modal
                  isOpen={reviewModal}
                  closer={() => setReviewModal(false)}
                  isXbtn={true}
                >
                  <ReviewModal />
                </Modal>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default HomePage;
