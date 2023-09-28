import "./comment-list.scss";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import CommentItem from "../CommentItem";
import commentIcon from "@assets/community/comment_icon.svg";
import commentBtn from "@assets/community/comment_btn.svg";
import { useGetPostReviews } from "@services/hooks/community";
import { usePostComment, usePostReply } from "@services/hooks/community";

const CommentList = () => {
  let postId = useParams().id; // 게시물 id
  const inputRef = useRef<HTMLInputElement>(null);
  const [reviewData, setReviewData] = useState<any>(); // 조회한 댓글 목록
  const [newComment, setNewComment] = useState(""); // 댓글창에서 작성한 텍스트
  const [selectedComment, setSelectedComment] = useState<number>(0); // 선택된 댓글 (reply 버튼 클릭된 댓글)
  const onGetPostReviews = useGetPostReviews();
  const onPostComment = usePostComment();
  const onPostReply = usePostReply();

  // 댓글 조회
  const getComment = async () => {
    const reviews = await onGetPostReviews(Number(postId));
    reviews.sort((a: any, b: any) => (a.id > b.id ? 1 : -1)); // 댓글 정렬 (id 오름차순)
    setReviewData(reviews);
  };

  useEffect(() => {
    getComment();
  }, []);

  // 댓글 작성 버튼 클릭
  const handleCommentBtnClick = async () => {
    // 댓글 작성일 경우
    if (selectedComment === 0) {
      const comment = {
        content: newComment,
      };
      const res = await onPostComment(Number(postId), comment);
    }
    // 대댓글 작성일 경우
    else {
      const reply = {
        parentId: selectedComment,
        content: newComment,
      };
      const res = await onPostReply(Number(postId), reply);
    }
    getComment(); // 댓글 리스트 새로 조회
    setSelectedComment(0); // 선택한 댓글 초기화
    setNewComment(""); // 댓글 입력창 비우기
  };

  // reply 버튼 클릭
  const handleReplyClick = (commentId: number) => {
    setSelectedComment(commentId);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      {/* 댓글 수 */}
      <div className="comment-cnt-container">
        <img src={commentIcon} alt="comment" />
        <p>{reviewData?.length}</p>
      </div>

      {/* 작성된 댓글 리스트 */}
      <div className="comment-list-container">
        <div className="comment-list-inner-container">
          {reviewData
            ?.filter((item: any) => item.parentId === null)
            ?.map((item: any) => {
              return (
                <div key={item?.id}>
                  <CommentItem
                    review={item}
                    isSelected={selectedComment === item?.id ? true : false}
                    isDeleted={item?.isRemoved}
                    isReply={false}
                    onClickReply={handleReplyClick}
                  />
                  {item?.replyList?.map((reply: any) => {
                    return (
                      <CommentItem
                        key={reply?.id}
                        review={reply}
                        isReply={true}
                        isDeleted={reply?.isRemoved}
                      />
                    );
                  })}
                </div>
              );
            })}
        </div>
      </div>

      {/* 댓글 작성 */}
      <div className="comment-input-container">
        <div className="comment-input-box">
          <input
            placeholder="Leave a comment"
            ref={inputRef}
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
          />
          <img src={commentBtn} onClick={handleCommentBtnClick} />
        </div>
      </div>
    </>
  );
};

export default CommentList;
