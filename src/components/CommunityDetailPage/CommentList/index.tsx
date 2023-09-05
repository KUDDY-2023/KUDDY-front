import "./comment-list.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import kuddyBadge from "@assets/community/kuddy_badge.svg";
import creatorBadge from "@assets/community/creator_badge.svg";

// depth 1이면 reply 버튼, 2이면 들여쓰기
const CommentList = () => {
  const nav = useNavigate();
  const [commentData, setCommentData] = useState<CommentType[]>([
    {
      userInfo: {
        nickname: "ian",
        profile:
          "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDJfMTM4/MDAxNjIyNjA5MzA1OTk4.8DiTAnBkxket9LiUgrL3mweXGHc-1wyNR1twaf8eM7Yg.MK0x-lU2LYHhLqcHLxg0MN9vZrFbCrUMQbere7MTRUYg.JPEG.seoraestudio/201214.%25EB%25B9%2584%25EB%258B%25A46151.jpg?type=w800",
        hasBadge: true,
        isCreator: false,
      },
      content:
        "It looks fine if you're going to another area by subway from Seongsu.",
      date: "2023.06.28",
      time: "11:55",
      depth: 1,
    },
    {
      userInfo: {
        nickname: "harper",
        profile:
          "https://mblogthumb-phinf.pstatic.net/MjAxOTA3MjNfMjQ3/MDAxNTYzODU2NTgzOTA0.yWLGnW9KsBmBpA7tS-9eQSlbPUaw8Xc_TssXPsYoJAUg.A3BqkKr1QmJCImy5D1niw7Ut-xKuouGfnIEVvtGox5gg.JPEG.so6428/SE-5c70b95d-e55b-4d03-837d-f58dbf89a561.jpg?type=w800",
        hasBadge: false,
        isCreator: true,
      },
      content:
        "That's a relief. Can you recommend a nearby area to take Line 2?",
      date: "2023.06.28",
      time: "11:55",
      depth: 2,
    },
    {
      userInfo: {
        nickname: "ian",
        profile:
          "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDJfMTM4/MDAxNjIyNjA5MzA1OTk4.8DiTAnBkxket9LiUgrL3mweXGHc-1wyNR1twaf8eM7Yg.MK0x-lU2LYHhLqcHLxg0MN9vZrFbCrUMQbere7MTRUYg.JPEG.seoraestudio/201214.%25EB%25B9%2584%25EB%258B%25A46151.jpg?type=w800",
        hasBadge: true,
        isCreator: false,
      },
      content:
        "If you go to Jamsil Station, there are many things to see such as Lotte World, Lotte Tower, Seokchon Lake, and so on! But it's hard to see all of them in one day, so I recommend going the next day.",
      date: "2023.06.28",
      time: "11:55",
      depth: 2,
    },
  ]);

  const handleProfileClick = (nickname: string) => {
    nav(`/profile/${nickname}`);
  };

  return (
    <div className="comment-list-container">
      <div className="comment-list-inner-container">
        {commentData.map((item, index) => {
          return (
            <div
              key={index}
              className={
                item.depth === 1
                  ? "comment-item-container"
                  : "comment-item-container indent"
              }
            >
              <div className="comment-profile">
                <img
                  src={item.userInfo.profile}
                  alt="profile"
                  onClick={() => {
                    handleProfileClick(item.userInfo.nickname);
                  }}
                />
              </div>

              <div className="comment-content-container">
                <div className="comment-content-top">
                  <div className="comment-nickname">
                    {item.userInfo.nickname}
                  </div>
                  {/* kuddy 뱃지 + creator 뱃지도 가능 */}
                  {item.userInfo.hasBadge && <img src={kuddyBadge} />}
                  {item.userInfo.isCreator && <img src={creatorBadge} />}
                  {/* ... 버튼 추가 필요 */}
                </div>

                <div className="comment-content-body">{item.content}</div>

                <div className="comment-content-bottom">
                  <div className="comment-date-time">
                    {item.date} {item.time}
                  </div>
                  {item.depth === 1 && (
                    <div className="comment-reply-btn">Reply</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentList;
