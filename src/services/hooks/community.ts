import { useEffect } from "react";
import { useQuery } from "react-query";
import {
  communityGetPostList,
  communityPostPost,
  communityGetKuddyReviews,
  communityGetTravelerReviews,
  communityGetEachPost,
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

// ✅ kuddy가 받은 리뷰 조회
export const useGetKuddyReviews = () => {
  const onGetKuddyReviews = async (id: number) => {
    try {
      const res = await communityGetKuddyReviews(id);
      return res.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  return onGetKuddyReviews;
};

// ✅ traveler가 받은 리뷰 조회
export const useGetTravelerReviews = () => {
  const onGetTravelerReviews = async (id: number) => {
    try {
      const res = await communityGetTravelerReviews(id);
      return res.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  return onGetTravelerReviews;
};

// ✅ 개별 게시물 조회
export const useGetEachPost = () => {
  const onGetEachPost = async (id: number) => {
    try {
      const res = await communityGetEachPost(id);
      return res.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  return onGetEachPost;
};
