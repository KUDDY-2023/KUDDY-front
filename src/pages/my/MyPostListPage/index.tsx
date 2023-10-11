import "./my-post-list-page.scss";
import { useEffect, useState } from "react";
import BackNavBar from "@components/_common/BackNavBar";
import { useNavigate } from "react-router-dom";
import {
  communityGetMyPosts,
  communityGetMyComments,
} from "@services/api/community";
import { useQuery } from "react-query";

const MyPostListPage = () => {
  const nav = useNavigate();
  const [type, setType] = useState<string>("Post");
  const types = ["Post", "Comment"];

  const { data, isLoading } = useQuery(
    ["getMyPosts", type],
    type === "Post" ? communityGetMyPosts : communityGetMyComments,
  );

  const altHour = (format: string) => {
    const target = new Date(format);
    target.setHours(target.getHours() + 9);
    return target.toLocaleString("sv");
  };

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
        {isLoading ? (
          <div></div>
        ) : data && data.data.data.length === 0 ? (
          <div className="empty">
            {type === "Post" ? "No post" : "No comment"}
          </div>
        ) : (
          data &&
          data.data.data.map((item: any, idx: number) => (
            <div
              className="post-container"
              key={item.id}
              onClick={() => nav(`/community/${item.id}`)}
            >
              {idx !== 0 && <div className="border" />}
              <div className="flex">
                <div className="category">
                  {item.postType === "itinerary"
                    ? "Route Feedback"
                    : item.postType === "talingBoard"
                    ? "Open Forum"
                    : ""}
                </div>
                {item.isJoinus === true && <div>Join us</div>}
              </div>
              <div className="title">
                {type === "Post" ? item.title : item.postTitle}
              </div>
              <div className="date">{altHour(item.createdDate)}</div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default MyPostListPage;
