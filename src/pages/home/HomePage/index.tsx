import TopBar from "@components/_common/TopBar/index";
import BottomNavBar from "@components/_common/BottomNavBar/index";

import SwiperCard from "@components/HomePage/SwiperCard/index";
import HomeSearchBar from "@components/HomePage/HomeSearchBar/index";
import Trending from "@components/HomePage/Trending/index";
import HomeMenu from "@components/HomePage/HomeMenu/index";
import WeeklyUser from "@components/HomePage/WeeklyUser/index";
import KuddysPickPreview from "@components/HomePage/KuddysPickPreview/index";
import Ad from "@components/HomePage/Ad/index";

import { useIsFirstLogin } from "@services/hooks/auth";
import { profileGetProfile } from "@services/api/profile";

import { useQuery } from "react-query";

const HomePage = () => {
  // 🔥 토큰이 있는 경우에 - 프로필 없으면 /auth/form으로 이동 필요

  // useIsFirstLogin("NEW_USER");
  // const { data, isLoading, error } = useQuery(
  //   "userProfile",
  //   profileGetProfile,
  //   { retry: false },
  // );

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
