import "./post-item.scss";
import { useNavigate, useLocation } from "react-router";
import commentIcon from "@assets/community/comment_icon.svg";

const PostItem = ({ post }: any) => {
  const nav = useNavigate();
  const type =
    typeof post?.postType !== "undefined" ? "talking-board" : "itinerary";

  const createdDate = new Date(post.createdDate).toLocaleString("sv");

  return (
    <div
      className="post-item-container"
      onClick={() => nav(`/community/${post.id}`)}
    >
      {type === "talking-board" && (
        <div className="item-top-container">
          {post.postType === "joinus" ? (
            <div className="post-filter is-join-us">Join us</div>
          ) : (
            <div className="post-filter">{post.subject}</div>
          )}
          {post.postType === "joinus" && (
            <div className="join-us-container">
              <div className="join-us-text bold-text">{post.district}</div>
              <div className="join-us-text">
                · {post.people} · {post.date}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="item-bottom-container">
        <div
          className={
            type === "talking-board" && post?.fileUrls?.length > 0
              ? "post-detail-container has-photo"
              : "post-detail-container"
          }
        >
          <div className="post-title">{post.title}</div>
          <div className="post-content-preview">{post.content}</div>
          {post.spots && (
            <div className="post-spots">
              {post.spots.map((spot: any, index: number) => (
                <div key={spot.id} className="post-spot-container">
                  <div className="post-spot-id">{index + 1}</div>
                  <div className="post-spot-name">{spot.name}</div>
                </div>
              ))}
            </div>
          )}
          <div className="post-info">
            <div className="post-date">{createdDate}</div>
            <div className="post-comment">
              <img src={commentIcon} alt="comment" />
              {post.commentNo}
            </div>
          </div>
        </div>
        {post?.fileUrls?.length > 0 && (
          <img
            className="post-photo"
            alt="post-photo"
            src={post?.fileUrls[0]}
          />
        )}
      </div>
    </div>
  );
};

export default PostItem;
