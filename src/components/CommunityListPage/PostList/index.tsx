import "./post-list.scss";
import { useRecoilValue } from "recoil";
import PostItem from "@components/CommunityListPage/PostItem";
import Loading from "@components/_common/Loading";
import { useGetPostList } from "@services/hooks/community";
import { postMenuState } from "@services/store/community";

const PostList = () => {
  const menuType = useRecoilValue(postMenuState); // 커뮤니티 메뉴 타입 - 전역 상태
  const { pageLastItemRef, hasNextPage, data } = useGetPostList(menuType);

  return (
    <div className="post-list-wrapper">
      {data ? (
        <div className="loading-container">
          <Loading backColor="transparent" spinnerColor="#eee" size="25px" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PostList;
