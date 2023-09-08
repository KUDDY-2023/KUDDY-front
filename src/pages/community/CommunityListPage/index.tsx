import "./community-list-page.scss";
import { useState } from "react";
import TopBar from "@components/_common/TopBar/index";
import PostList from "@components/CommunityListPage/PostList";
import WritePostBtn from "@components/CommunityListPage/WritePostBtn";
import BottomNavBar from "@components/_common/BottomNavBar/index";
import { useGetPostList } from "@services/hooks/community";

const CommunityListPage = () => {
  const [postList, setPostList] = useState();

  const onGetPostList = useGetPostList();
  const handleMenuClick = async (menu: MenuType) => {
    const menuType =
      menu === "itinerary-feedback" ? "itinerary" : "talkingboard";
    const res = await onGetPostList(menuType, 2, 10);
    setPostList(res);
    console.log(res);
  };

  return (
    <div className="community-list-container">
      <TopBar isCommunity={true} handleMenuClick={handleMenuClick} />
      <PostList postList={postList} />
      <div style={{ height: "120vh" }} />
      <WritePostBtn />
      <BottomNavBar />
    </div>
  );
};

export default CommunityListPage;
