import "./weekly-user.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { profileGetTop5 } from "@services/api/profile";

const WeeklyUser = () => {
  const nav = useNavigate();
  const [weeklyUser, setWeeklyUser] = useState<any[]>();
  useEffect(() => {
    profileGetTop5()
      .then(res => setWeeklyUser(res.data.data.profileList))
      .catch();
  }, []);
  console.log(weeklyUser);

  return (
    <>
      <div className="weeklyuser-title">Weekly K-Buddy</div>
      <div className="weeklyuser-container">
        {weeklyUser &&
          weeklyUser.map(item => (
            <div
              className="weeklyuser-rect"
              key={item.id}
              onClick={() => nav(`/profile/${item.nickname}`)}
            >
              <div className="weeklyuser-top-section">
                <div className="weeklyuser-grade">{item.kuddyLevel}</div>
                <div className="weeklyuser-profile-circle">
                  <img src={item.profileImage} />
                </div>
                <div className="weeklyuser-username">{item.nickname}</div>
              </div>
              <div className="weeklyuser-review">
                <div className="weeklyuser-review-title">Review</div>
                <div className="weeklyuser-review-text">{`review`}</div>
              </div>
            </div>
          ))}
        <div className="end"></div>
      </div>
    </>
  );
};

export default WeeklyUser;
