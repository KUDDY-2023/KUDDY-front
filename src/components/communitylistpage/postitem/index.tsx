import "./postitem.scss";
import { useNavigate } from "react-router";
import commentIcon from "@assets/community/comment.svg";

const PostItem = ({
  type,
  id,
  title,
  content,
  courses,
  date,
  comment,
}: PostType) => {
  const nav = useNavigate();

  return (
    <div
      className="post-container"
      onClick={() => nav(`/community/${type}/${id}`)}
    >
      <div className="post-title">{title}</div>
      <div className="post-content">{content}</div>
      {courses && (
        <div className="post-courses">
          {courses.map(course => (
            <div key={course.id} className="post-course-container">
              <div className="post-course-id">{course.id}</div>
              <div className="post-course-name">{course.name}</div>
            </div>
          ))}
        </div>
      )}
      <div className="post-info">
        <div className="post-date">{date}</div>
        <div className="post-comment">
          <img src={commentIcon} alt="comment" />
          {comment}
        </div>
      </div>
    </div>
  );
};

export default PostItem;
