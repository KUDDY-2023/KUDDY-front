import "./postlist.scss";
import { useState } from "react";
import Post from "@components/communitylistpage/post";

type menuType = "feedback" | "talking";

type courseType = {
  id: number;
  name: string;
};

type postType = {
  type: menuType;
  id: number;
  title: string;
  content: string;
  courses?: courseType[];
  date: string;
  comment: number;
};

const PostList = () => {
  const [menu, setMenu] = useState<menuType>("feedback"); // 선택한 메뉴 ("feedback" | "talking")

  // 게시물 데이터
  const [post, setPost] = useState<postType[]>([
    {
      type: "feedback",
      id: 1,
      title: "Who knows Seongsu-dong well?",
      content:
        "hi guys!  bla bla how about my tour course in sungsu? coment plz",
      courses: [
        { id: 1, name: "place name" },
        { id: 2, name: "place name" },
        { id: 3, name: "place name" },
        { id: 4, name: "longlonglonglonglong place name" },
        { id: 5, name: "place name" },
        { id: 6, name: "place name" },
        { id: 7, name: "place name" },
      ],
      date: "2099.99.99",
      comment: 12,
    },
    {
      type: "feedback",
      id: 2,
      title: "Who knows Seongsu-dong well?",
      content:
        "hi guys!  bla bla how about my tour course in sungsu? coment plz",
      courses: [
        { id: 1, name: "place name" },
        { id: 2, name: "long place name" },
        { id: 3, name: "longlonglong place name" },
      ],
      date: "2099.99.99",
      comment: 12,
    },
    {
      type: "feedback",
      id: 3,
      title: "Who knows Seongsu-dong well?",
      content:
        "hi guys!  bla bla how about my tour course in sungsu? coment plz",
      courses: [
        { id: 1, name: "place name" },
        { id: 2, name: "place name" },
      ],
      date: "2099.99.99",
      comment: 12,
    },
    {
      type: "talking",
      id: 4,
      title: "Please choose a good restaurant in Sinchon",
      content: `Just like the title
      1. very good restaurant
      2. traditional restaurant
      3. friendly restaurant
      Number 1 and 2 are good restaurants, so there's a lot of waiting. Number 3 is my personal favorite.`,
      date: "2023.06.28",
      comment: 12,
    },
  ]);

  const handleMenuClick = (clickedMenu: menuType) => {
    menu !== clickedMenu && setMenu(clickedMenu);
  };

  return (
    <div className="post-list-wrapper">
      <div className="menu-container">
        <div
          className={menu === "feedback" ? "menu-btn clicked" : "menu-btn"}
          onClick={() => handleMenuClick("feedback")}
        >
          Itinerary Feedback
        </div>
        <div
          className={menu === "talking" ? "menu-btn clicked" : "menu-btn"}
          onClick={() => handleMenuClick("talking")}
        >
          Talking Board
        </div>
      </div>
      {post.map(item => item.type === menu && <Post key={item.id} {...item} />)}
    </div>
  );
};

export default PostList;
