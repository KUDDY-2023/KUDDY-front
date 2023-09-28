import "./weekly-user.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { profileGetTop5 } from "@services/api/profile";

const WeeklyUser = () => {
  const nav = useNavigate();
  const [weeklyUser, setWeeklyUser] = useState<any[]>();
  useEffect(() => {
    profileGetTop5()
      .then(res => setWeeklyUser(res.data.data.top5KuddyList))
      .catch();
  }, []);

  return (
    <>
      <div className="weeklyuser-title">Weekly K-Buddy</div>
      <div className="weeklyuser-container">
        {weeklyUser &&
          weeklyUser.map((item: any) => (
            <div
              className="weeklyuser-rect"
              key={item.profileId}
              onClick={() => nav(`/profile/${item.nickname}`)}
            >
              <div className="weeklyuser-top-section">
                <div className="weeklyuser-grade">{item.kuddyLevel}</div>
                <div className="weeklyuser-profile-circle">
                  <img src={item.profileImageUrl} />
                </div>
                <div className="weeklyuser-username">{item.nickname}</div>
              </div>
              <div className="weeklyuser-review">
                <div className="weeklyuser-review-title">Review</div>
                <div className="weeklyuser-review-text">
                  {item.recentReview}
                </div>
              </div>
            </div>
          ))}
        <div className="end"></div>
      </div>
    </>
  );
};

export default WeeklyUser;
