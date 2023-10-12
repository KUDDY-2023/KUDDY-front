import "./write-post-btn.scss";
import { useNavigate } from "react-router-dom";
import postBtn from "@assets/community/post_btn.svg";

const WritePostBtn = () => {
  const nav = useNavigate();

  return (
    <div className="btn-container">
      <object data={postBtn}></object>
      <div
        className="post-btn-click"
        onClick={() => {
          nav("/community/write");
        }}
      ></div>
    </div>
  );
};

export default WritePostBtn;
