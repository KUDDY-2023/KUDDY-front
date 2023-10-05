import "./view-more-btn.scss";
import { useState, useEffect } from "react";
import { ReactComponent as CommentElseIcon } from "@assets/community/comment_else.svg";
import { ReactComponent as PostElseIcon } from "@assets/icon/else_default.svg";
import useModal from "@utils/hooks/useModal";

type Props = {
  isComment: boolean; // 커뮤니티 댓글인지
  isCommunity: boolean; // 커뮤니티 페이지인지 (프로필일 때는 메뉴 띄우기)
  handleBtnClick: React.MouseEventHandler<HTMLDivElement>;
  isMine?: boolean; // 내 게시물인지
};

/*
[댓글]
내 댓글에만 ... 버튼 (삭제용)

[게시물]
내 게시물 -> 삭제
다른 사람 게시물 -> 공유

[프로필]
다른 사람 프로필 -> 신고, 공유
 */

const ViewMoreBtn = ({
  isComment,
  isCommunity,
  handleBtnClick,
  isMine,
}: Props) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { buttonRef, modalRef } = useModal(isOpened, setIsOpened);

  const handlePostElseClick = () => {};

  return (
    <>
      {isComment ? (
        <div className="view-more-container">
          <div
            className="comment-else"
            ref={buttonRef}
            onClick={() => setIsOpened(!isOpened)}
          >
            <CommentElseIcon />
          </div>
          {isOpened && (
            <div className="else-dropdown comment" ref={modalRef}>
              <div className="click-area comment" onClick={handleBtnClick}>
                <p>Delete</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <PostElseIcon onClick={handlePostElseClick} id="else-icon" />
      )}
    </>
  );
};

export default ViewMoreBtn;
