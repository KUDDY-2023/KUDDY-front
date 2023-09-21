import "./write-review-page.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackNavBar from "@components/_common/BackNavBar";
import pinIcon from "@assets/icon/pin_default.svg";
import { useGetMeetUps, usePostReview } from "@services/hooks/user";

const WriteReviewPage = () => {
  const appointmentId = useParams().id;
  const [meetUp, setMeetUp] = useState<any>();
  const [aboutBuddy, setAboutBuddy] = useState("");
  const [satisfaction, setSatisfaction] = useState([
    { grade: "Perfect", isSelected: false },
    { grade: "Good", isSelected: false },
    { grade: "Disappoint", isSelected: false },
  ]);

  // 만족도 버튼 클릭
  const handleSatisfactionClick = (grade: string) => {
    const newSatisfaction = satisfaction.map(item =>
      item.grade === grade
        ? { ...item, isSelected: !item.isSelected }
        : { ...item, isSelected: false },
    );

    setSatisfaction(newSatisfaction);
  };

  const onGetMeetUps = useGetMeetUps();
  const onPostReview = usePostReview();

  // complete 버튼 클릭
  const handleCompleteClick = async () => {
    const selectedSatisfaction = satisfaction.filter(item => item.isSelected);
    console.log("만족도" + selectedSatisfaction[0].grade.toLowerCase());
    console.log("리뷰 작성 폼 제출");
    const res = await onPostReview({
      meetId: Number(appointmentId),
      content: aboutBuddy,
      grade: selectedSatisfaction[0].grade.toLowerCase(),
    });
    console.log(res);
  };

  // 같은 id의 동행 정보 저장
  useEffect(() => {
    const getMeetUps = async () => {
      let res = await onGetMeetUps();

      for (let i = 0; i < res?.meetupList?.length; i++) {
        if (res.meetupList[i].meetupId === Number(appointmentId)) {
          res = res.meetupList[i];
        }
      }
      setMeetUp(res);
    };

    getMeetUps();
  }, []);

  return (
    <>
      <BackNavBar middleTitle="Write Review" isShare={false} />

      <div className="write-review-container">
        <div className="appointment-container">
          <div className="appointment-top-section">
            <div className="appointment-date">{meetUp?.appointmentTime}</div>
            <div className="mate-section">
              <img src={meetUp?.targetMemberInfo?.profileImageUrl} />
              <div className="mate-nickname">
                {meetUp?.targetMemberInfo?.targetNickname}
              </div>
            </div>
          </div>
          <div className="appointment-bottom-section">
            <img src={pinIcon} />
            <div className="appointment-spot">{meetUp?.spotName}</div>
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
                    onClick={() => handleSatisfactionClick(item.grade)}
                  >
                    {item.grade}
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
