import "./comment-list.scss";
import CommentItem from "../CommentItem";

const CommentList = ({ reviewData }: any) => {
  return (
    <div className="comment-list-container">
      <div className="comment-list-inner-container">
        {reviewData?.map((item: any) => {
          return (
            <>
              <CommentItem key={item?.id} review={item} isReply={false} />
              {item?.replyList?.map((reply: any) => {
                return (
                  <CommentItem key={reply?.id} review={reply} isReply={true} />
                );
              })}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default CommentList;
