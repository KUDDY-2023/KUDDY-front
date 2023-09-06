import TopBar from "@components/_common/TopBar/index";
import BottomNavBar from "@components/_common/BottomNavBar/index";
import SwiperCard from "@components/HomePage/SwiperCard/index";
import HomeSearchBar from "@components/HomePage/HomeSearchBar/index";
import Trending from "@components/HomePage/Trending/index";
import HomeMenu from "@components/HomePage/HomeMenu/index";
import WeeklyUser from "@components/HomePage/WeeklyUser/index";
import KuddysPickPreview from "@components/HomePage/KuddysPickPreview/index";
import Ad from "@components/HomePage/Ad/index";

import { useEffect } from "react";
import { useIsFirstLogin } from "@services/hooks/auth";
import { profileGetProfile } from "@services/api/profile";

import { useQuery } from "react-query";

const HomePage = () => {
  useIsFirstLogin("MAIN");

  return (
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
  );
};

export default HomePage;
