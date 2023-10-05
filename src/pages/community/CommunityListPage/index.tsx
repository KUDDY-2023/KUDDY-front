import "./community-list-page.scss";
import { useRecoilState } from "recoil";
import TopBar from "@components/_common/TopBar/index";
import PostList from "@components/CommunityListPage/PostList";
import WritePostBtn from "@components/CommunityListPage/WritePostBtn";
import BottomNavBar from "@components/_common/BottomNavBar/index";
import { postMenuState } from "@services/store/community";

const CommunityListPage = () => {
  const [menuType, setMenuType] = useRecoilState(postMenuState);

  // 상단 메뉴 클릭
  const handleMenuClick = (menu: MenuType) => {
    menu === "itinerary-feedback"
      ? setMenuType("itinerary")
      : setMenuType("talkingboard");
  };

  return (
    <>
      <TopBar isCommunity={true} handleMenuClick={handleMenuClick} />
      <div className="community-list-container">
        <PostList />
        <div style={{ height: "120vh" }} />
        <WritePostBtn />
        <BottomNavBar />
      </div>
    </>
  );
};

export default CommunityListPage;
