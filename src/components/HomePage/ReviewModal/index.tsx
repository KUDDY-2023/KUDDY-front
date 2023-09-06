import "./review-modal.scss";
import image from "@assets/home/review_modal_image.svg";
import { ReactComponent as ArrowIcon } from "@assets/icon/home_text_arrow.svg";

const ReviewModal = () => {
  return (
    <div className="review-modal-wrapper">
      <img className="logo" src={image} />
      <div className="main-text">How was the meeting?</div>
      <div className="sub-text">Your review will help other mates!</div>
      <div className="bottom-rect">
        <div className="text">Writing a review</div>
        <ArrowIcon />
      </div>
    </div>
  );
};

export default ReviewModal;
