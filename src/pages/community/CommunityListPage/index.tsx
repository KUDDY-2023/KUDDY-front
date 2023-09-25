import "./community-list-page.scss";
import { useState, useEffect } from "react";
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
    const res = await onGetPostList(menuType, 0, 10);
    setPostList(res);
  };

  useEffect(() => {
    const getFirstPostList = async () => {
      const res = await onGetPostList("itinerary", 0, 10);
      setPostList(res);
    };
    getFirstPostList();
  }, []);

  return (
    <>
      <TopBar isCommunity={true} handleMenuClick={handleMenuClick} />
      <div className="community-list-container">
        <PostList postList={postList} />
        <div style={{ height: "120vh" }} />
        <WritePostBtn />
        <BottomNavBar />
      </div>
    </>
  );
};

export default CommunityListPage;
