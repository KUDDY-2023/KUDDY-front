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

  const [isSplash, setIsSplash] = useState<boolean>(true);
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
            </>
          )}
        </>
      )}
    </>
  );
};

export default HomePage;
