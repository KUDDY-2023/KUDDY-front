import "./communitylistpage.scss";
import { useNavigate } from "react-router-dom";
import TopBar from "@components/_common/topbar/index";
import PostList from "@components/communitylistpage/postlist";
import NavBar from "@components/_common/navbar/index";
import postBtn from "@assets/community/post.svg";

const CommunityListPage = () => {
  const nav = useNavigate();

  return (
    <>
      <TopBar />
      <PostList />
      <div className="btn-container">
        <img src={postBtn} alt="post" onClick={() => nav("/community/write")} />
      </div>
      <NavBar />
    </>
  );
};

export default CommunityListPage;
