import TopBar from "@components/_common/topbar/index";
import Menu from "@components/communitylistpage/menu/index";
import PostList from "@components/communitylistpage/postlist";
import WritePostBtn from "@components/communitylistpage/writepostbtn";
import NavBar from "@components/_common/navbar/index";

const CommunityListPage = () => {
  return (
    <>
      <TopBar />
      <Menu />
      <PostList />
      <WritePostBtn />
      <NavBar />
    </>
  );
};

export default CommunityListPage;
