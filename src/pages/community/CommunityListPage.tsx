import TopBar from "@components/_common/topbar/index";
import PostList from "@components/CommunityListPage/PostList";
import WritePostBtn from "@components/CommunityListPage/WritePostBtn";
import NavBar from "@components/_common/navbar/index";

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
      <NavBar />
    </>
  );
};

export default CommunityListPage;
