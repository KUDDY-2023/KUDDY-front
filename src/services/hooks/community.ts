import { useEffect } from "react";
import { useQuery } from "react-query";
import {
  communityGetPostList,
  communityPostPost,
} from "@services/api/community";
import {
  itineraryPostState,
  joinUsPostState,
  othersPostState,
} from "@services/store/community";

// ✅ 게시글 리스트 조회
export const useGetPostList = () => {
  const onGetPostList = async (type: string, page: number, size: number) => {
    try {
      const { data } = await communityGetPostList(type, page, size);
      return data.data.posts;
    } catch (err) {
      console.log(err);
    }
  };

  return onGetPostList;
};

// ✅ 게시물 작성
export const usePostPost = () => {
  const onPostPost = async (type: string, post: any) => {
    try {
      const res = await communityPostPost(type, post);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  return onPostPost;
};
