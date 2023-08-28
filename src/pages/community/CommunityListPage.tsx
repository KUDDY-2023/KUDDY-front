import TopBar from "@components/_common/TopBar/index";
import PostList from "@components/CommunityListPage/PostList";
import WritePostBtn from "@components/CommunityListPage/WritePostBtn";
import BottomNavBar from "@components/_common/BottomNavBar/index";

const CommunityListPage = () => {
  return (
    <>
      <TopBar isCommunity={true} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <PostList />
      <div style={{ height: "120vh" }} />
      <WritePostBtn />
      <BottomNavBar />
    </>
  );
};

export default CommunityListPage;
