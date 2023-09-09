import "./post-list.scss";
import { useState, useEffect } from "react";
import PostItem from "@components/CommunityListPage/PostItem";

const PostList = ({ postList }: any) => {
  return (
    <div className="post-list-wrapper">
      {postList?.map((post: any) => <PostItem key={post.id} post={post} />)}
    </div>
  );
};

export default PostList;
