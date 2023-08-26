import "./writepostbtn.scss";
import { useNavigate } from "react-router-dom";
import postBtn from "@assets/community/post_btn.svg";

const WritePostBtn = () => {
  const nav = useNavigate();

  return (
    <div className="btn-container">
      <img src={postBtn} alt="post" onClick={() => nav("/community/write")} />
    </div>
  );
};

export default WritePostBtn;
