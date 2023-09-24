import "./my-post-list-page.scss";
import { useEffect, useState } from "react";
import BackNavBar from "@components/_common/BackNavBar";
import { useNavigate } from "react-router-dom";
import {
  communityGetMyPosts,
  communityGetMyComments,
} from "@services/api/community";

const MyPostListPage = () => {
  const nav = useNavigate();
  const [type, setType] = useState<string>("Post");
  const types = ["Post", "Comment"];
  const [postsArray, setPostsArray] = useState<any[]>([]);

  useEffect(() => {
    type === "Post"
      ? communityGetMyPosts().then(res => setPostsArray(res.data.data))
      : communityGetMyComments().then(res => setPostsArray(res.data.data));
  }, [type]);

  console.log(postsArray);

  return (
    <>
      <BackNavBar middleTitle="My post" isShare={false} />
      <div style={{ height: "10px" }} />
      <div className="travel-mates-selectbar-container">
        {types.map(item => (
          <div
            className={type === item ? "select-btn active" : "select-btn"}
            onClick={() => setType(item)}
            key={item}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="my-post-list-container">
        {postsArray.length === 0 ? (
          <div className="empty">
            {type === "Post" ? "No post" : "No comment"}
          </div>
        ) : (
          postsArray.map((item, idx) => (
            <div
              className="post-container"
              key={item.id}
              onClick={() => nav(`/community/${item.postType}/${item.id}`)}
            >
              {idx !== 0 && <div className="border" />}
              <div className="flex">
                <div className="category">
                  {item.postType === "itenerary-feedback"
                    ? "Itenerary Feedback"
                    : item.postType === "talking-board"
                    ? "Open Forum"
                    : ""}
                </div>
                {/* item.isJoinus === true && <div>Join us</div> */}
              </div>
              <div className="title">
                {type === "Post" ? item.title : item.postTitle}
              </div>
              <div className="date">{item.createdDate}</div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default MyPostListPage;
