import "./commentlist.scss";
import { useState } from "react";
import kuddyBadge from "@assets/community/kuddy-badge.svg";
import creatorBadge from "@assets/community/creator-badge.svg";

// depth 1이면 reply 버튼, 2이면 들여쓰기
const CommentList = () => {
  const [commentData, setCommentData] = useState<CommentType[]>([
    {
      userInfo: {
        nickname: "ian",
        profile:
          "https://s3-alpha-sig.figma.com/img/fbb8/d9ac/1ce502fe13469a7dc64838483c74591e?Expires=1693785600&Signature=OpDoQijvXdgFWa3GfuIaZ3sSZszsYfF4vlAgAoTtac34kdCxF6CQ-ft0MRUJdbnEecuxrEKyINTqcyDIstN2Ljz51yWeDCtVzySJff~d2~Mg4PJFKqtkiOidpOctfSIMHBePgdrE11kAFgMazzo-DHeW5hP7G-ot~1JIIINyPjTdtik2ZnzIMdPvLQWr2g0SIQs27rJcb-mjj3qnNfBCLpK~SeO0A8wehpKyUNavdapm9mKsIyL-T7w~ivdvAo0tcHNDPX4K3yA8AJEprjRzjwUbSk7y04Y-8Vjg6-cts9uAPZoViIjDkGqLwJV59n0eVqECruApKa1tW-bT5BTmSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
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
          "https://s3-alpha-sig.figma.com/img/f408/2883/2744c00e820f277563889c3bca4f7fd4?Expires=1693785600&Signature=NW7GU2ur3j9YwthaW4SX5bT1gE7AS7qHLUs5sduOuNmgwPVorgWkqEhqTl2Z8XLFE4nkXrAVDgih3i3xp40tFIhkWtswSY43pb4pvZtRj46trdGdAuR2lsbiLUUZqNFSFHAJiv-7afUX0x7cgYAO0IPAxyIaPdJhjpxOC9odP3-kgazfqDl9UlaF1ALav4o1ZgD8ciEYXZbZzu5HjEGlfzenwd5Th7vR71MVGHnzxul7JjW3iIKOY3kLs2blDiPuySnWlwwYrpWEJabh7Z2OUD9Fmw5MWSnsxrBYpWFWDyYmHYas7RXi0WlNFJb-NBt5y4CCAjnH3cCLwAzF0ilKZQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
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
          "https://s3-alpha-sig.figma.com/img/fbb8/d9ac/1ce502fe13469a7dc64838483c74591e?Expires=1693785600&Signature=OpDoQijvXdgFWa3GfuIaZ3sSZszsYfF4vlAgAoTtac34kdCxF6CQ-ft0MRUJdbnEecuxrEKyINTqcyDIstN2Ljz51yWeDCtVzySJff~d2~Mg4PJFKqtkiOidpOctfSIMHBePgdrE11kAFgMazzo-DHeW5hP7G-ot~1JIIINyPjTdtik2ZnzIMdPvLQWr2g0SIQs27rJcb-mjj3qnNfBCLpK~SeO0A8wehpKyUNavdapm9mKsIyL-T7w~ivdvAo0tcHNDPX4K3yA8AJEprjRzjwUbSk7y04Y-8Vjg6-cts9uAPZoViIjDkGqLwJV59n0eVqECruApKa1tW-bT5BTmSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
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

  return (
    <div className="comment-list-container">
      <div className="comment-list-inner-container">
        {commentData.map(item => {
          return (
            <div
              className={
                item.depth === 1
                  ? "comment-item-container"
                  : "comment-item-container indent"
              }
            >
              <div className="comment-profile">
                <img src={item.userInfo.profile} alt="profile" />
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
