import "./community-detail-page.scss";
import { useParams } from "react-router-dom";
import BackNavBar from "@components/_common/BackNavBar";
import PostContent from "@components/CommunityDetailPage/PostContent";
import CommentList from "@components/CommunityDetailPage/CommentList";
import CommentInput from "@components/CommunityDetailPage/CommentInput";

import {
  ItineraryFeedbackPostData,
  TalkingBoardPostData,
} from "@utils/data/communityPost";

const CommunityDetailPage = () => {
  const { category, id } = useParams() as { category: MenuType; id: string };

  // 게시물 데이터 조회 코드 추가 필요
  let PostData;
  switch (category) {
    case "itinerary-feedback":
      PostData = ItineraryFeedbackPostData[parseInt(id) - 1];
      break;
    default:
      PostData = TalkingBoardPostData[parseInt(id) - 1];
  }

  return (
    <div className="community-detail-container">
      <BackNavBar
        middleTitle={
          category === "itinerary-feedback"
            ? "Itinerary Feedback"
            : "Talking Board"
        }
        isShare={true}
      />
      <PostContent {...PostData} />
      <CommentList />
      <CommentInput />
    </div>
  );
};

export default CommunityDetailPage;
