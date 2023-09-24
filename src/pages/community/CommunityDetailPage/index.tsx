import "./community-detail-page.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BackNavBar from "@components/_common/BackNavBar";
import PostContent from "@components/CommunityDetailPage/PostContent";
import CommentList from "@components/CommunityDetailPage/CommentList";
import CommentInput from "@components/CommunityDetailPage/CommentInput";
import { useGetEachPost, useGetPostReviews } from "@services/hooks/community";

const CommunityDetailPage = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState<any>();
  const [reviewData, setReviewData] = useState<any>();
  const [title, setTitle] = useState<string>("");
  const onGetEachPost = useGetEachPost();
  const onGetPostReviews = useGetPostReviews();

  // 게시물 상세 조회
  useEffect(() => {
    const getPostInfo = async () => {
      const res = await onGetEachPost(Number(id));
      setPostData(res);
      const reviews = await onGetPostReviews(Number(id));
      setReviewData(reviews);
    };

    getPostInfo();
  }, []);

  // 삭제할 코드
  useEffect(() => {
    console.log(reviewData);
  }, [reviewData]);

  useEffect(() => {
    if (typeof postData !== "undefined") {
      typeof postData?.postType !== "undefined"
        ? setTitle("Open Forum")
        : setTitle("Route Feedback");
    }
  }, [postData]);

  return (
    <div className="community-detail-container">
      <BackNavBar middleTitle={title} isShare={true} />
      <PostContent postData={postData} reviewCnt={reviewData?.length} />
      <CommentList reviewData={reviewData} />
      <CommentInput />
    </div>
  );
};

export default CommunityDetailPage;
