import "./community-detail-page.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BackNavBar from "@components/_common/BackNavBar";
import PostContent from "@components/CommunityDetailPage/PostContent";
import CommentList from "@components/CommunityDetailPage/CommentList";
import CommentInput from "@components/CommunityDetailPage/CommentInput";
import { useGetEachPost } from "@services/hooks/community";

const CommunityDetailPage = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState<any>();
  const [title, setTitle] = useState<string>("");
  const onGetEachPost = useGetEachPost();

  // 게시물 상세 조회
  useEffect(() => {
    const getEachPost = async () => {
      const res = await onGetEachPost(Number(id));
      setPostData(res);
    };

    getEachPost();
    console.log(postData);
  }, []);

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
      <PostContent postData={postData} />
      <CommentList />
      <CommentInput />
    </div>
  );
};

export default CommunityDetailPage;
