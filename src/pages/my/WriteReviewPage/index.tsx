import "./writereviewpage.scss";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BackNavBar from "@components/_common/backnavbar";
import pinIcon from "@assets/icon/pin_default.svg";

type AppointmentType = {
  id: number;
  type: "scheduled" | "completed" | "canceled";
  meeting: {
    date: string;
    place: string;
  };
  mate: {
    profile: string;
    nickname: string;
  };
  acceptedDate: string;
  hasReview: boolean;
};

const WriteReviewPage = () => {
  const appointmentId = useParams().id;
  const [aboutBuddy, setAboutBuddy] = useState("");
  const [satisfaction, setSatisfaction] = useState([
    { type: "Perfect", isSelected: false },
    { type: "Good", isSelected: false },
    { type: "Disappoint", isSelected: false },
  ]);

  // 동행 조회 필요
  const [appointment, setAppointment] = useState<AppointmentType>({
    id: 1,
    type: "scheduled",
    meeting: {
      date: "2023.06.19  11am",
      place: "Gyeongbokgung Palace",
    },
    mate: {
      profile:
        "https://s3-alpha-sig.figma.com/img/f408/2883/2744c00e820f277563889c3bca4f7fd4?Expires=1693785600&Signature=NW7GU2ur3j9YwthaW4SX5bT1gE7AS7qHLUs5sduOuNmgwPVorgWkqEhqTl2Z8XLFE4nkXrAVDgih3i3xp40tFIhkWtswSY43pb4pvZtRj46trdGdAuR2lsbiLUUZqNFSFHAJiv-7afUX0x7cgYAO0IPAxyIaPdJhjpxOC9odP3-kgazfqDl9UlaF1ALav4o1ZgD8ciEYXZbZzu5HjEGlfzenwd5Th7vR71MVGHnzxul7JjW3iIKOY3kLs2blDiPuySnWlwwYrpWEJabh7Z2OUD9Fmw5MWSnsxrBYpWFWDyYmHYas7RXi0WlNFJb-NBt5y4CCAjnH3cCLwAzF0ilKZQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      nickname: "Harper",
    },
    acceptedDate: "2023.05.05  13:50",
    hasReview: false,
  });

  const handleSatisfactionClick = (type: string) => {
    const newSatisfaction = satisfaction.map(item =>
      item.type === type
        ? { ...item, isSelected: !item.isSelected }
        : { ...item, isSelected: false },
    );

    setSatisfaction(newSatisfaction);
  };

  const handleCompleteClick = () => {
    console.log("리뷰 작성 폼 제출");
  };

  return (
    <>
      <BackNavBar middleTitle="Write Review" isShare={false} />

      <div className="write-review-container">
        <div className="appointment-container">
          <div className="appointment-top-section">
            <div className="appointment-date">{appointment.meeting.date}</div>
            <div className="mate-section">
              <img src={appointment.mate.profile} />
              <div className="mate-nickname">{appointment.mate.nickname}</div>
            </div>
          </div>
          <div className="appointment-bottom-section">
            <img src={pinIcon} />
            <div className="appointment-spot">{appointment.meeting.place}</div>
          </div>
        </div>

        <div className="review-form-container">
          <div className="review-form">
            <div className="question-text">How was the meeting?</div>
            <div className="satisfaction-btn-container">
              {satisfaction.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={
                      item.isSelected
                        ? "satisfaction-btn selected"
                        : "satisfaction-btn"
                    }
                    onClick={() => handleSatisfactionClick(item.type)}
                  >
                    {item.type}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="review-form" id="about-buddy">
            <div className="question-text">Please write about Buddy!</div>
            <textarea
              value={aboutBuddy}
              onChange={e => setAboutBuddy(e.target.value)}
            />
          </div>
        </div>

        <div className="complete-btn-container">
          <div className="complete-btn" onClick={handleCompleteClick}>
            Complete
          </div>
        </div>
      </div>
    </>
  );
};

export default WriteReviewPage;
