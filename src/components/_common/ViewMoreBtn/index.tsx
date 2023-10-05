import "./view-more-btn.scss";
import { ReactNode, useState } from "react";
import { ReactComponent as CommentElseIcon } from "@assets/community/comment_else.svg";
import { ReactComponent as PostElseIcon } from "@assets/icon/else_default.svg";
import useModal from "@utils/hooks/useModal";

type Props = {
  isComment: boolean; // 댓글인지
  children: ReactNode; // 메뉴 아이템
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

const ViewMoreBtn = ({ isComment, children }: Props) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { buttonRef, modalRef } = useModal(isOpened, setIsOpened);

  return (
    <>
      <div ref={buttonRef} onClick={() => setIsOpened(!isOpened)}>
        {isComment ? (
          <CommentElseIcon className="comment-else" />
        ) : (
          <PostElseIcon className="nav-bar-else" />
        )}
        {isOpened && (
          <div className="more-menu-container" ref={modalRef}>
            <div className="more-menu">{children}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewMoreBtn;
