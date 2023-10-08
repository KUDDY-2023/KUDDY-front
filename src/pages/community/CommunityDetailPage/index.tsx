import "./community-detail-page.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackNavBar from "@components/_common/BackNavBar";
import PostContent from "@components/CommunityDetailPage/PostContent";
import CommentList from "@components/CommunityDetailPage/CommentList";
import Loading from "@components/_common/Loading";
import { useGetEachPost, useDeletePost } from "@services/hooks/community";
import { useGetProfile } from "@services/hooks/profile";

const CommunityDetailPage = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [postData, setPostData] = useState<any>();
  const [title, setTitle] = useState<string>("");
  const onGetEachPost = useGetEachPost();
  const onDeletePost = useDeletePost();
  const { data, isLoading, error } = useGetProfile();

  // 게시물 상세 조회
  useEffect(() => {
    const getPostInfo = async () => {
      const res = await onGetEachPost(Number(id));
      setPostData(res);
    };

    getPostInfo();
  }, []);

  useEffect(() => {
    if (typeof postData !== "undefined") {
      typeof postData?.postType !== "undefined"
        ? setTitle("Open Forum")
        : setTitle("Route Feedback");
    }
  }, [postData]);

  // 게시물 삭제
  const handleDeleteClick = async () => {
    const res = await onDeletePost(Number(id));
    nav("/community/list");
  };

  // 게시물 공유
  const handleShareClick = () => {
    console.log("share link");
  };

  return (
    <div className="community-detail-container">
      <BackNavBar middleTitle={title} isShare={false} hasMoreBtn={true}>
        <>
          {data?.data.data.memberInfo?.memberId ===
            postData?.writerInfoDto?.writerId && (
            <div className="menu-click-area" onClick={handleDeleteClick}>
              <p>delete</p>
            </div>
          )}
          <div className="menu-click-area" onClick={handleShareClick}>
            <p>share link</p>
          </div>
        </>
      </BackNavBar>
      {!postData ? (
        <Loading backColor="transparent" spinnerColor="#eee" size="25px" />
      ) : (
        <>
          <PostContent postData={postData} />
          <CommentList />
        </>
      )}
    </div>
  );
};

export default CommunityDetailPage;
