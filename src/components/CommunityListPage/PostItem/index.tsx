import "./post-item.scss";
import { useNavigate, useLocation } from "react-router";
import commentIcon from "@assets/community/comment_icon.svg";

const PostItem = ({ post }: any) => {
  const nav = useNavigate();
  const type = new URLSearchParams(useLocation().search).get("type");

  return (
    <div
      className="post-item-container"
      onClick={() => nav(`/community/${type}/${post.postId}`)}
    >
      {type === "talking-board" && (
        <div className="item-top-container">
          {post.filter === "joinus" ? (
            <div className="post-filter is-join-us">Join us</div>
          ) : (
            <div className="post-filter">{post.subject}</div>
          )}
          {post.filter === "joinus" && (
            <div className="join-us-container">
              <div className="join-us-text bold-text">{post.joinDistrict}</div>
              <div className="join-us-text">
                · {post.joinPeople} · {post.joinDate}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="item-bottom-container">
        <div
          className={
            type === "talking-board" && post.photoList
              ? "post-detail-container has-photo"
              : "post-detail-container"
          }
        >
          <div className="post-title">{post.title}</div>
          <div className="post-content-preview">{post.content}</div>
          {post.spotList && (
            <div className="post-spots">
              {post.spotList.map((spot: SpotType) => (
                <div key={spot.spotId} className="post-spot-container">
                  <div className="post-spot-id">{spot.spotId}</div>
                  <div className="post-spot-name">{spot.spotName}</div>
                </div>
              ))}
            </div>
          )}
          <div className="post-info">
            <div className="post-date">{post.createdDate}</div>
            <div className="post-comment">
              <img src={commentIcon} alt="comment" />
              99
            </div>
          </div>
        </div>
        {post.photoList && (
          <img
            className="post-photo"
            alt="post-photo"
            src={post.photoList[0]}
          />
        )}
      </div>
    </div>
  );
};

export default PostItem;
