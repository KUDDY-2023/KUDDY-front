import "./commentinput.scss";
import { useState } from "react";
import commentBtn from "@assets/community/comment_btn.svg";

const CommentInput = () => {
  const [newComment, setNewComment] = useState("");

  return (
    <div className="comment-input-container">
      <div className="comment-input-box">
        <input
          placeholder="Leave a comment"
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
        />
        <img src={commentBtn} />
      </div>
    </div>
  );
};

export default CommentInput;
