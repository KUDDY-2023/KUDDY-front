import "./postitem.scss";
import { useNavigate, useLocation } from "react-router";
import commentIcon from "@assets/community/comment-icon.svg";

const PostItem = ({ ...props }) => {
  const nav = useNavigate();
  const category = new URLSearchParams(useLocation().search).get("category");

  return (
    <div
      className="post-item-container"
      onClick={() => nav(`/community/${category}/${props.postId}`)}
    >
      {category === "talking-board" && (
        <div className="item-top-container">
          <div
            className={
              props.filter === "Join us"
                ? "post-filter is-join-us"
                : "post-filter"
            }
          >
            {props.filter}
          </div>
          {props.filter === "Join us" && (
            <div className="join-us-container">
              <div className="join-us-text bold-text">{props.joinDistrict}</div>
              <div className="join-us-text">
                · {props.joinPeople} · {props.joinDate}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="item-bottom-container">
        <div
          className={
            category === "talking-board" && props.spotList
              ? "post-detail-container has-photo"
              : "post-detail-container"
          }
        >
          <div className="post-title">{props.title}</div>
          <div className="post-content-preview">{props.content}</div>
          {props.spotList && (
            <div className="post-spots">
              {props.spotList.map((spot: SpotType) => (
                <div key={spot.id} className="post-spot-container">
                  <div className="post-spot-id">{spot.id}</div>
                  <div className="post-spot-name">{spot.place}</div>
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
        {props.photoList && (
          <img
            className="post-photo"
            alt="post-photo"
            src={props.photoList[0].src}
          />
        )}
      </div>
    </div>
  );
};

export default PostItem;
