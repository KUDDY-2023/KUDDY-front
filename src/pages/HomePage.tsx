import TopBar from "@components/_common/topbar/index";
import NavBar from "@components/_common/navbar/index";

import SwiperCard from "@components/homepage/swipercard/index";
import HomeSearchBar from "@components/homepage/homesearchbar/index";
import Trending from "@components/homepage/trending/index";
import HomeMenu from "@components/homepage/homemenu/index";
import WeeklyUser from "@components/homepage/weeklyuser/index";
import KuddysPickPreview from "@components/homepage/kuddyspickpreview/index";
import Ad from "@components/homepage/ad/index";

const HomePage = () => {
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
      <NavBar />
    </>
  );
};

export default HomePage;
