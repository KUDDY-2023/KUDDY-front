import Header from "@components/homepage/header/Header";
import SwiperCard from "@components/homepage/swipercard/SwiperCard";
import SearchBar from "@components/homepage/searchbar/SearchBar";
import Trending from "@components/homepage/trending/Trending";
import Menu from "@components/homepage/menu/Menu";
import WeeklyUser from "@components/homepage/weeklyuser/WeeklyUser";
import KuddysPick from "@components/homepage/kuddyspick/KuddysPick";
import Ad from "@components/homepage/ad/Ad";
import NavBar from "@components/_common/navbar/NavBar";

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
