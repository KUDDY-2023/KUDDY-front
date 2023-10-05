import {
  communityGetPostList,
  communityPostPost,
  communityGetKuddyReviews,
  communityGetTravelerReviews,
  communityGetEachPost,
  communityGetPostReviews,
  communityPostComment,
  communityPostReply,
} from "@services/api/community";
import useInfiniteScroll from "@utils/hooks/useInfiniteScroll";

// ✅ 게시글 리스트 조회
export const useGetPostList = (type: string) => {
  const {
    pageLastItemRef,
    data,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useInfiniteScroll({
    queryKey: ["postList", type],
    fetch: communityGetPostList,
    fetchParams: { size: 10, type: type },
    onIntersect: async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isFetching) fetchNextPage();
    },
  });
  return { pageLastItemRef, hasNextPage, data, isLoading };
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

// ✅ 게시물 댓글 조회
export const useGetPostReviews = () => {
  const onGetPostReviews = async (id: number) => {
    try {
      const res = await communityGetPostReviews(id);
      return res.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  return onGetPostReviews;
};

// ✅ 게시물 댓글 작성
export const usePostComment = () => {
  const onPostComment = async (id: number, comment: any) => {
    try {
      const res = await communityPostComment(id, comment);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  return onPostComment;
};

// ✅ 게시물 대댓글 작성
export const usePostReply = () => {
  const onPostReply = async (id: number, reply: any) => {
    try {
      const res = await communityPostReply(id, reply);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  return onPostReply;
};
