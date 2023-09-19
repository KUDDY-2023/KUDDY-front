import "./community-detail-page.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BackNavBar from "@components/_common/BackNavBar";
import PostContent from "@components/CommunityDetailPage/PostContent";
import CommentList from "@components/CommunityDetailPage/CommentList";
import CommentInput from "@components/CommunityDetailPage/CommentInput";
import { useGetEachPost } from "@services/hooks/community";

import {
  ItineraryFeedbackPostData,
  TalkingBoardPostData,
} from "@utils/data/communityPost";

const CommunityDetailPage = () => {
  const { id } = useParams();
  let category;
  const [postData, setPostData] = useState();
  const onGetEachPost = useGetEachPost();

  useEffect(() => {
    const getEachPost = async () => {
      const res = await onGetEachPost(Number(id));
      setPostData(res);
    };

    getEachPost();
    console.log(postData);
  }, []);

  return (
    <div className="community-detail-container">
      <BackNavBar middleTitle={"Itinerary Feedback"} isShare={true} />
      <PostContent postData={postData} />
      <CommentList />
      <CommentInput />
    </div>
  );
};

export default CommunityDetailPage;
