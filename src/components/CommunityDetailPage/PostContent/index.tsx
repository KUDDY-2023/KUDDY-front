import "./post-content.scss";
import commentIcon from "@assets/community/comment_icon.svg";
import PhotoSlide from "@components/CommunityDetailPage/PhotoSlide";

type Props = {
  postData: any;
  reviewCnt: number;
};

const PostContent = ({ postData, reviewCnt }: Props) => {
  const category =
    typeof postData?.postType !== "undefined" ? "talking" : "itinerary";

  // join us 상세
  const joinDetail = [
    { id: 1, title: "People", value: `${postData?.people}` },
    { id: 2, title: "Region", value: `${postData?.district}` },
    { id: 3, title: "Date", value: `${postData?.date}` },
  ];

  return (
    <div className="post-content-container">
      <div className="post-header">
        <div className="writer-container">
          <img src={postData?.writerProfile} alt="writer-profile" />
          <div className="writer-right-section">
            <div className="writer-name">{postData?.writerName}</div>
            <div className="write-date">{postData?.createdDate}</div>
          </div>
        </div>
        {category === "talking" && (
          <div
            className={
              postData?.postType === "joinus"
                ? "post-filter join-us"
                : "post-filter"
            }
          >
            {postData?.postType}
          </div>
        )}
      </div>

      <div className="post-body">
        <div className="post-title">{postData?.title}</div>
        {category === "talking" && postData?.postType === "joinus" && (
          <div className="join-detail-container">
            {joinDetail.map(item => (
              <div>
                <div className="join-detail-title">{item.title}</div>
                <div className="join-detail-value">{item.value}</div>
              </div>
            ))}
          </div>
        )}
        <div className="post-content">{postData?.content}</div>
        {/* 사진 있으면 사진, 코스 피드백 게시판이면 코스 및 지도 렌더링되도록 코드 추가 예정*/}
        {category === "itinerary" && (
          <div className="spot-list-container">
            {postData?.spots?.map((spot: any, index: number) => {
              return (
                <>
                  {index > 0 && (
                    <div className="spot-distance-container">
                      <div className="spot-line"></div>
                      <div className="spot-distance">distance</div>
                    </div>
                  )}
                  <div className="spot-item-container">
                    <div className="spot-item">
                      <div className="spot-num">{index + 1}</div>
                      <div className="spot-name">{spot?.name}</div>
                      <div className="spot-district">
                        {spot?.district.toLowerCase()}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        )}

        {postData?.fileUrls && <PhotoSlide />}
      </div>

      <div className="post-footer">
        <img src={commentIcon} alt="comment" />
        <p>{reviewCnt}</p>
      </div>
    </div>
  );
};

export default PostContent;
