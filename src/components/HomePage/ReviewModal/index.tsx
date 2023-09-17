import "./review-modal.scss";
import image from "@assets/home/review_modal_image.svg";
import { ReactComponent as ArrowIcon } from "@assets/icon/home_text_arrow.svg";
import { useNavigate } from "react-router-dom";

type ReviewModalProps = { meetupId: number };

const ReviewModal = ({ meetupId }: ReviewModalProps) => {
  const nav = useNavigate();
  return (
    <div className="review-modal-wrapper">
      <img className="logo" src={image} />
      <div className="main-text">How was the meeting?</div>
      <div className="sub-text">Your review will help other mates!</div>
      <div
        className="bottom-rect"
        onClick={() => nav(`/my/write-review/${meetupId}`)}
      >
        <div className="text">Writing a review</div>
        <ArrowIcon />
      </div>
    </div>
  );
};

export default ReviewModal;
