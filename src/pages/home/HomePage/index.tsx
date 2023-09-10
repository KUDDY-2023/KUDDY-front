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

const HomePage = () => {
  useIsFirstLogin("MAIN");

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
  // 가장 최근 지난 약속부터 며칠까지 띄울건지, 프론트에서 받아와서 계산?
  // default false로 변경 필요함
  const [reviewModal, setReviewModal] = useState<boolean>(false);

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
  );
};

export default HomePage;
