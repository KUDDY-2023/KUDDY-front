import "./review-box.scss";

const ReviewBox = ({ ...props }) => {
  return props.isKuddy ? (
    <div className="review-content-container kuddy">
      <div className="review-grade-kuddy">
        <div className="review-date-text">{props.createdAt}</div>
        <div className="review-grade-box">{props.grade}</div>
      </div>
      <img src={props.writer.profileImg} />
      <div className="review-content-text">
        <strong>{props.writer.name}</strong>
      </div>
      <div className="review-content-text">{props.content}</div>
    </div>
  ) : (
    <div className="review-content-container">
      <div className="review-content-text">{props.content}</div>
      <div className="review-profile-traveler">
        <div className="review-profile-inner-traveler">
          <div className="review-content-text">
            with <strong>{props.kuddy.name}</strong>
          </div>
          <div className="review-date-text">{props.createdAt}</div>
        </div>
        <img src={props.kuddy.profileImg} />
      </div>
    </div>
  );
};

export default ReviewBox;
