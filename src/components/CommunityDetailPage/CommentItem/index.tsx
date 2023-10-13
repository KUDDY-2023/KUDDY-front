import "./comment-item.scss";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Level1Icon } from "@assets/level/level1.svg";
import { ReactComponent as Level2Icon } from "@assets/level/level2.svg";
import { ReactComponent as Level3Icon } from "@assets/level/level3.svg";
import { ReactComponent as Level4Icon } from "@assets/level/level4.svg";
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
              {review?.writerInfoDto?.kuddyLevel !== "NOT_KUDDY" && (
                <div className="kuddy-badge">
                  {review?.writerInfoDto?.kuddyLevel !== "NOT_KUDDY" ? (
                    review?.writerInfoDto?.kuddyLevel === "EXPLORER" ? (
                      <Level4Icon />
                    ) : review?.writerInfoDto?.kuddyLevel === "FRIEND" ? (
                      <Level3Icon />
                    ) : review?.writerInfoDto?.kuddyLevel === "COMPANION" ? (
                      <Level2Icon />
                    ) : review?.writerInfoDto?.kuddyLevel === "SOULMATE" ? (
                      <Level1Icon />
                    ) : null
                  ) : null}
                </div>
              )}
              {review?.isAuthor && <img src={creatorBadge} />}
            </div>
            {isMine && (
              <ViewMoreBtn isComment={true}>
                <div className="menu-click-area" onClick={onClickDelete}>
                  <p>delete</p>
                </div>
              </ViewMoreBtn>
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
