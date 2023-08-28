import "./post-list.scss";
import { useLocation } from "react-router-dom";
import {
  ItineraryFeedbackPostData,
  TalkingBoardPostData,
} from "@utils/data/communityPost";
import PostItem from "@components/CommunityListPage/PostItem";

const PostList = () => {
  const clickedMenuType = new URLSearchParams(useLocation().search).get(
    "category",
  );

  return (
    <div className="post-list-wrapper">
      {clickedMenuType === "itinerary-feedback"
        ? ItineraryFeedbackPostData.map(item => (
            <PostItem key={item.postId} {...item} />
          ))
        : TalkingBoardPostData.map(item => (
            <PostItem key={item.postId} {...item} />
          ))}
    </div>
  );
};

export default PostList;
