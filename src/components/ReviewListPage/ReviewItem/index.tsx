import "./review-item.scss";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "@assets/icon/arrow_right.svg";

type Props = {
  role: string;
  review: any;
  isMine: boolean;
  onDelete: React.MouseEventHandler<HTMLDivElement>;
};

const ReviewItem = ({ role, review, isMine, onDelete }: Props) => {
  const nav = useNavigate();
  const createdDate = new Date(review?.createdDate)
    .toLocaleString("sv")
    .split(" ", 1);

  // 리뷰 만족도 텍스트
  const handleGrade = (grade: string) => {
    switch (grade) {
      case "Perfect":
        return "Excellent";
        break;
      case "Disappoint":
        return "Disappointing";
        break;
      default:
        return grade;
    }
  };

  return (
    <div className={`review-item-container ${role.toLowerCase()}`}>
      {role === "KUDDY" ? (
        // Kuddy
        <>
          <div className="review-item-header">
            <div className="kuddy-profile-container">
              <img src={review?.writerInfo?.profileImageUrl} />
              <div className="user-name-container">
                <div className="user-name">{review?.writerInfo?.nickname}</div>
                <div className="date">
                  {createdDate[0].replaceAll("-", ".")}
                </div>
              </div>
            </div>
            <div
              className={
                review?.grade === "Perfect" ? "grade perfect" : "grade"
              }
            >
              {handleGrade(review?.grade)}
            </div>
          </div>
          <div className="review-content">{review?.content}</div>
        </>
      ) : (
        // Traveler
        <>
          <div className="review-item-header">
            <div
              className={
                review?.grade === "Perfect" ? "grade perfect" : "grade"
              }
            >
              {handleGrade(review?.grade)}
            </div>
            <div
              className="traveler-profile-container"
              onClick={() => nav(`/profile/${review?.kuddyInfo?.nickname}`)}
            >
              <div className="user-name">{review?.kuddyInfo?.nickname}</div>
              <img src={review?.kuddyInfo?.profileImageUrl} />
              <ArrowIcon className="arrow" />
            </div>
          </div>
          <div className="review-content">{review?.content}</div>
          <div className="review-item-footer">
            <div className="date traveler">
              {createdDate[0].replaceAll("-", ".")}
            </div>
            {isMine && (
              <div className="delete" onClick={onDelete}>
                delete
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewItem;
