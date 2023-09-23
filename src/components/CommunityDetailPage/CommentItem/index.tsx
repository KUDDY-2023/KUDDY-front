import "./comment-item.scss";
import { useNavigate } from "react-router-dom";
import kuddyBadge from "@assets/community/kuddy_badge.svg";
import creatorBadge from "@assets/community/creator_badge.svg";

type Props = {
  review: any;
  isReply: boolean;
};

const CommentItem = ({ review, isReply }: Props) => {
  const nav = useNavigate();

  const handleProfileClick = (nickname: string) => {
    nav(`/profile/${nickname}`);
  };

  return (
    <div
      className={
        isReply ? "comment-item-container indent" : "comment-item-container"
      }
    >
      <div className="comment-profile">
        <img
          src={review?.commentWriterInfoDto?.profileImageUrl}
          alt="profile"
          onClick={() => {
            handleProfileClick(review?.commentWriterInfoDto?.nickname);
          }}
        />
      </div>

      <div className="comment-content-container">
        <div className="comment-content-top">
          <div
            className="comment-nickname"
            onClick={() => {
              handleProfileClick(review?.commentWriterInfoDto?.nickname);
            }}
          >
            {review?.commentWriterInfoDto?.nickname}
          </div>
          {/* kuddy 뱃지 + creator 뱃지도 가능 */}
          {/*review.userInfo.hasBadge && <img src={kuddyBadge} />*/}
          {review?.isAuthor && <img src={creatorBadge} />}
          {/* ... 버튼 추가 필요 */}
        </div>

        <div className="comment-content-body">{review?.content}</div>

        <div className="comment-content-bottom">
          <div className="comment-date-time">{review?.createdDate}</div>
          {!isReply && <div className="comment-reply-btn">Reply</div>}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
