import "./weeklyuser.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type UserType = {
  id: number;
  grade: string;
  profile_img: string;
  username: string;
  user_id: string;
  reveiw: string;
};

// 유저 프로필로 네비게이트 필요
const WeeklyUser = () => {
  const nav = useNavigate();
  const [weeklyUser, setWeeklyUser] = useState<UserType[]>([
    {
      id: 1,
      grade: "Soulmate",
      profile_img:
        "https://c1.wallpaperflare.com/preview/714/489/198/chess-chess-board-game-board-flag.jpg",
      username: "Abcdef",
      user_id: "",
      reveiw:
        "great! awesome! you are great tour maker! I hope to see you again on my next trip!you are great tour maker! ",
    },
    {
      id: 2,
      grade: "Soul",
      profile_img:
        "https://c1.wallpaperflare.com/preview/714/489/198/chess-chess-board-game-board-flag.jpg",
      username: "Ghijk",
      user_id: "",
      reveiw:
        "great! awesome! you are great tour maker!you are great tour maker! ",
    },
    {
      id: 3,
      grade: "Soulmate",
      profile_img:
        "https://c1.wallpaperflare.com/preview/714/489/198/chess-chess-board-game-board-flag.jpg",
      username: "Lmnop",
      user_id: "",
      reveiw: "great! awesome!",
    },
  ]);
  return (
    <>
      <div className="weeklyuser-title">Weekly K-Buddy</div>
      <div className="weeklyuser-container">
        {weeklyUser.map(item => (
          <div
            className="weeklyuser-rect"
            key={item.id}
            onClick={() => nav(`/${item.user_id}`)}
          >
            <div className="weeklyuser-top-section">
              <div className="weeklyuser-grade">{item.grade}</div>
              <div className="weeklyuser-profile-circle">
                <img src={item.profile_img} />
              </div>
              <div className="weeklyuser-username">{item.username}</div>
            </div>
            <div className="weeklyuser-review">
              <div className="weeklyuser-review-title">Review</div>
              <div className="weeklyuser-review-text">{item.reveiw}</div>
            </div>
          </div>
        ))}
        <div className="end"></div>
      </div>
    </>
  );
};

export default WeeklyUser;
