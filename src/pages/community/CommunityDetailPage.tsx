import { useParams } from "react-router-dom";
import BackNavBar from "@components/_common/backnavbar";
import PostDetail from "@components/communitydetailpage/postcontent";
import {
  ItineraryFeedbackPostData,
  TalkingBoardPostData,
} from "@utils/data/communityPost";

const CommunityDetailPage = () => {
  const { category, id } = useParams() as { category: MenuType; id: string };

  // 게시물 데이터 조회 코드 추가 필요
  let PostData: ItineraryFeedbackPost | TalkingBoardPost;
  switch (category) {
    case "itinerary-feedback":
      PostData = ItineraryFeedbackPostData[parseInt(id) - 1];
      break;
    default:
      PostData = TalkingBoardPostData[parseInt(id) - 1];
  }

  return (
    <>
      <BackNavBar
        middleTitle={
          category === "itinerary-feedback"
            ? "Itinerary Feedback"
            : "Talking Board"
        }
        isShare={false}
      />
      <PostDetail {...PostData} />
    </>
  );
};

export default CommunityDetailPage;
