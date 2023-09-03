import "./my-post-list-page.scss";
import { useEffect, useState } from "react";
import BackNavBar from "@components/_common/BackNavBar";
import { useNavigate } from "react-router-dom";

const MyPostListPage = () => {
  const nav = useNavigate();
  const [type, setType] = useState<string>("Post");
  const types = ["Post", "Comment"];
  const [postsArray, setPostsArray] = useState<MyPostType[]>(PostPosts);

  useEffect(() => {
    setPostsArray(type === "Post" ? PostPosts : CommentPosts);
  }, [type]);

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
        {postsArray.map((item, idx) => (
          <div
            className="post-container"
            key={item.id}
            onClick={() => nav(`/community/${item.category}/${item.id}`)}
          >
            {idx !== 0 && <div className="border" />}
            <div className="flex">
              <div className="category">
                {item.category === "itenerary-feedback"
                  ? "Itenerary Feedback"
                  : item.category === "talking-board"
                  ? "Talking Board"
                  : ""}
              </div>
              {item.isJoinus === true && <div>Join us</div>}
            </div>
            <div className="title">{item.title}</div>
            <div className="date">{item.created_at}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyPostListPage;

type MyPostType = {
  id: number;
  category: "talking-board" | "itenerary-feedback";
  isJoinus?: boolean;
  title: string;
  created_at: string;
};

const PostPosts: MyPostType[] = [
  {
    id: 1,
    category: "talking-board",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquet nibh vel nisi hendrerit vestibulum.",
    created_at: "2099.99.99 12:55",
  },
  {
    id: 2,
    category: "talking-board",
    isJoinus: true,
    title:
      "dolor sit amet, consectetur adipiscing elit. Aenean aliquet nibh vel nisi hendrerit vestibulum.",
    created_at: "2099.99.99 12:55",
  },
  {
    id: 3,
    category: "itenerary-feedback",
    title:
      "consectetur adipiscing elit. Aenean aliquet nibh vel nisi hendrerit vestibulum.",
    created_at: "2099.99.99 12:55",
  },
];

const CommentPosts: MyPostType[] = [
  {
    id: 1,
    category: "talking-board",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquet nibh vel nisi hendrerit vestibulum.",
    created_at: "2099.99.99 12:55",
  },
  {
    id: 2,
    category: "talking-board",
    isJoinus: true,
    title:
      "dolor sit amet, consectetur adipiscing elit. Aenean aliquet nibh vel nisi hendrerit vestibulum.",
    created_at: "2099.99.99 12:55",
  },
  {
    id: 3,
    category: "itenerary-feedback",
    title:
      "consectetur adipiscing elit. Aenean aliquet nibh vel nisi hendrerit vestibulum.",
    created_at: "2099.99.99 12:55",
  },
  {
    id: 4,
    category: "talking-board",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquet nibh vel nisi hendrerit vestibulum.",
    created_at: "2099.99.99 12:55",
  },
  {
    id: 5,
    category: "talking-board",
    isJoinus: true,
    title:
      "dolor sit amet, consectetur adipiscing elit. Aenean aliquet nibh vel nisi hendrerit vestibulum.",
    created_at: "2099.99.99 12:55",
  },
  {
    id: 6,
    category: "itenerary-feedback",
    title:
      "consectetur adipiscing elit. Aenean aliquet nibh vel nisi hendrerit vestibulum.",
    created_at: "2099.99.99 12:55",
  },
  {
    id: 7,
    category: "talking-board",
    isJoinus: true,
    title:
      "dolor sit amet, consectetur adipiscing elit. Aenean aliquet nibh vel nisi hendrerit vestibulum.",
    created_at: "2099.99.99 12:55",
  },
  {
    id: 8,
    category: "itenerary-feedback",
    title:
      "consectetur adipiscing elit. Aenean aliquet nibh vel nisi hendrerit vestibulum.",
    created_at: "2099.99.99 12:55",
  },
];
