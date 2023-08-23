import "./postdetail.scss";
import { useState } from "react";
import { useParams } from "react-router-dom";
import commentIcon from "@assets/community/comment.svg";
import PhotoSlide from "@components/communitydetailpage/photoslide";

const PostDetail = ({ ...props }) => {
  const { category } = useParams() as { category: MenuType };

  // join us 상세
  const [joinDetail, setJoinDetail] = useState([
    { id: 1, title: "People", value: `${props.joinPeople}` },
    { id: 2, title: "District", value: `${props.joinDistrict}` },
    { id: 3, title: "Date", value: `${props.joinDate}` },
  ]);

  return (
    <div className="post-content-container">
      <div className="post-header">
        <div className="writer-container">
          <img src={props.writerProfile} alt="writer-profile" />
          <div className="writer-right-section">
            <div className="writer-name">{props.writerName}</div>
            <div className="write-date">
              {props.writeDate} {props.writeTime}
            </div>
          </div>
        </div>
        {category === "talking-board" && (
          <div
            className={
              props.filter === "Join us" ? "post-filter join-us" : "post-filter"
            }
          >
            {props.filter}
          </div>
        )}
      </div>

      <div className="post-body">
        <div className="post-title">{props.title}</div>
        {props?.filter === "Join us" && (
          <div className="join-detail-container">
            {joinDetail.map(item => (
              <div>
                <div className="join-detail-title">{item.title}</div>
                <div className="join-detail-value">{item.value}</div>
              </div>
            ))}
          </div>
        )}
        <div className="post-content">{props.content}</div>
        {/* 사진 있으면 사진, 코스 피드백 게시판이면 코스 및 지도 렌더링되도록 코드 추가 예정*/}
        {props.photoList && <PhotoSlide />}
      </div>

      <div className="post-footer">
        <img src={commentIcon} alt="comment" />
        <p>{props.commentCnt}</p>
      </div>
    </div>
  );
};

export default PostDetail;
