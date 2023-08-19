import "./communitylistpage.scss";
import TopBar from "@components/_common/topbar/index";
import PostList from "@components/communitylistpage/postlist";
import NavBar from "@components/_common/navbar/index";
import postBtn from "@assets/community/post.svg";

const CommunityListPage = () => {
  return (
    <>
      <TopBar />
      <PostList />
      <div className="btn-container">
        <img src={postBtn} alt="post" />
      </div>
      <NavBar />
    </>
  );
};

export default CommunityListPage;
