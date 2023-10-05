import "./comment-item.scss";
import { useNavigate } from "react-router-dom";
import kuddyBadge from "@assets/community/kuddy_badge.svg";
import creatorBadge from "@assets/community/creator_badge.svg";
import ViewMoreBtn from "@components/_common/ViewMoreBtn";

type Props = {
  review: any;
  isReply: boolean;
  isDeleted: boolean; // 삭제된 댓글
  isMine: boolean; // 내 댓글인지
  onClickDelete: React.MouseEventHandler<HTMLDivElement>;
  isSelected?: boolean; // reply 버튼 클릭된 댓글 (선택된 댓글)
  onClickReply?: (commentId: number) => void; // reply 버튼 클릭
};

const CommentItem = ({
  review,
  isReply,
  isDeleted,
  isMine,
  onClickDelete,
  isSelected,
  onClickReply,
}: Props) => {
  const nav = useNavigate();
  const createdDate = new Date(review?.createdDate).toLocaleString("sv");

  const handleProfileClick = (nickname: string) => {
    nav(`/profile/${nickname}`);
  };

  return (
    <div
      className={
        isReply ? "comment-item-container indent" : "comment-item-container"
      }
      id={isSelected ? "selected-comment" : ""}
    >
      {!isDeleted ? (
        <div className="comment-profile">
          <img
            src={review?.writerInfoDto?.profileImageUrl}
            alt="profile"
            onClick={() => {
              handleProfileClick(review?.writerInfoDto?.nickname);
            }}
          />
        </div>
      ) : (
        <div className="comment-profile deleted"></div>
      )}

      {!isDeleted ? (
        <div className="comment-content-container">
          <div className="comment-content-top">
            <div className="comment-profile-info">
              <div
                className="comment-nickname"
                onClick={() => {
                  handleProfileClick(review?.writerInfoDto?.nickname);
                }}
              >
                {review?.writerInfoDto?.nickname}
              </div>
              {/* kuddy 뱃지 + creator 뱃지도 가능 */}
              {/*review.userInfo.hasBadge && <img src={kuddyBadge} />*/}
              {review?.isAuthor && <img src={creatorBadge} />}
              {/* ... 버튼 추가 필요 */}
            </div>
            {isMine && (
              <ViewMoreBtn
                isComment={true}
                isCommunity={true}
                handleBtnClick={onClickDelete}
              />
            )}
          </div>

          <div className="comment-content-body">{review?.content}</div>

          <div className="comment-content-bottom">
            <div className="comment-date-time">{createdDate}</div>
            {!isReply && (
              <div
                className="comment-reply-btn"
                onClick={() => onClickReply?.(Number(review.id))}
              >
                Reply
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="comment-content-container deleted">
          This comment has been deleted.
        </div>
      )}
    </div>
  );
};

export default CommentItem;
