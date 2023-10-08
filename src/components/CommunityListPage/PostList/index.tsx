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
      {!data ? (
        <div id="spinner-container">
          <Loading backColor="transparent" spinnerColor="#eee" size="30px" />
        </div>
      ) : (
        <>
          {data.pages[0].data.data.posts?.length === 0 && (
            <div className="no-posts">No posts</div>
          )}
          {data.pages.map(
            page =>
              page.data.data.posts?.map((post: any, idx: number) =>
                page.data.data.pageInfo.size === idx + 1 ? (
                  <div
                    key={post.id}
                    ref={pageLastItemRef}
                    className="last-post-item"
                  >
                    <PostItem post={post} />
                  </div>
                ) : (
                  <PostItem key={post.id} post={post} />
                ),
              ),
          )}
          {!hasNextPage && data.pages[0].data.data.posts?.length !== 0 && (
            <div className="end-of-post-list">End of list</div>
          )}
        </>
      )}
    </div>
  );
};

export default PostList;
