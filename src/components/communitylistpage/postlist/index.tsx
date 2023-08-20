import "./postlist.scss";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PostItem from "@components/communitylistpage/postitem/index";

const PostList = () => {
  const clickedMenuType = new URLSearchParams(useLocation().search).get(
    "category",
  );
  // 게시물 데이터
  const [post, setPost] = useState<PostType[]>([
    {
      type: "itinerary-feedback",
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
      type: "itinerary-feedback",
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
      type: "itinerary-feedback",
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
      type: "talking-board",
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

  return (
    <div className="post-list-wrapper">
      {post.map(
        item =>
          item.type === clickedMenuType && <PostItem key={item.id} {...item} />,
      )}
    </div>
  );
};

export default PostList;
