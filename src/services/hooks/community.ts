import { useEffect } from "react";
import { useQuery } from "react-query";
import { communityGetPostList } from "@services/api/community";

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
