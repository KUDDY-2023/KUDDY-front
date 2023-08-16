import Header from "@components/homepage/header/index";
import SwiperCard from "@components/homepage/swipercard/index";
import SearchBar from "@components/homepage/searchbar/index";
import Trending from "@components/homepage/trending/index";
import Menu from "@components/homepage/menu/index";
import WeeklyUser from "@components/homepage/weeklyuser/index";
import KuddysPick from "@components/homepage/kuddyspick/index";
import Ad from "@components/homepage/ad/index";
import NavBar from "@components/_common/navbar/index";

const HomePage = () => {
  return (
    <>
      <Header />
      <SwiperCard />
      <SearchBar />
      <Trending />
      <Menu />
      <WeeklyUser />
      <KuddysPick />
      <Ad />
      <NavBar />
    </>
  );
};

export default HomePage;
