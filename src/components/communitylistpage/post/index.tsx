import "./post.scss";
import commentIcon from "@assets/community/comment.svg";

type menuType = "feedback" | "talking";

type courseType = {
  id: number;
  name: string;
};

type PostProps = {
  type: menuType;
  id: number;
  title: string;
  content: string;
  courses?: courseType[];
  date: string;
  comment: number;
};

const Post = ({
  type,
  id,
  title,
  content,
  courses,
  date,
  comment,
}: PostProps) => {
  return (
    <div className="post-container">
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

export default Post;
