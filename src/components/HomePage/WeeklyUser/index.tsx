import "./weekly-user.scss";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { profileGetTop5 } from "@services/api/profile";

const WeeklyUser = () => {
  const nav = useNavigate();
  const { data } = useQuery(["weeklyUser"], profileGetTop5, {
    staleTime: 1800000,
    cacheTime: Infinity,
    retry: 3,
  });
  return (
    <>
      <div className="weeklyuser-title">Weekly K-Buddy</div>
      <div className="weeklyuser-container">
        {data &&
          data.data.data.top5KuddyList.map((item: any) => (
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
