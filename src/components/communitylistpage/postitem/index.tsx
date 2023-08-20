import "./postitem.scss";
import { useNavigate, useLocation } from "react-router";
import commentIcon from "@assets/community/comment.svg";

const PostItem = ({ ...props }) => {
  const nav = useNavigate();
  const clickedMenuType = new URLSearchParams(useLocation().search).get(
    "category",
  );

  return (
    <div
      className="post-container"
      onClick={() => nav(`/community/${clickedMenuType}/${props.postId}`)}
    >
      <div className="post-title">{props.title}</div>
      <div className="post-content">{props.content}</div>
      {props.spotList && (
        <div className="post-courses">
          {props.spotList.map((spot: SpotType) => (
            <div key={spot.id} className="post-course-container">
              <div className="post-course-id">{spot.id}</div>
              <div className="post-course-name">{spot.place}</div>
            </div>
          ))}
        </div>
      )}
      <div className="post-info">
        <div className="post-date">{props.writeDate}</div>
        <div className="post-comment">
          <img src={commentIcon} alt="comment" />
          {props.commentCnt}
        </div>
      </div>
    </div>
  );
};

export default PostItem;
