import { apiClient } from ".";

/**
 * 유저와 관련된 api
 * api 함수 이름 규칙 : community + 동사(method) + 목적어
 * 단순히 res.data만을 리턴
 * 그 외 복잡한 로직은 hooks에서 처리
 */

// ✅ 게시글 리스트 조회
export const communityGetPostList = async (
  type: string,
  page: number,
  size: number,
) => {
  const url = `/api/v1/posts/list?type=${type}&page=${page}&size=${size}`;
  return apiClient.get(url);
};

// ✅ 게시물 작성
export const communityPostPost = async (type: string, post: any) => {
  const url = `/api/v1/posts?type=${type}`;
  return apiClient.post(url, post);
};

// ✅ kuddy가 받은 리뷰 조회
export const communityGetKuddyReviews = async (id: number) => {
  const url = `/api/v1/reviews/kuddy/${id}`;
  return apiClient.get(url);
};

// ✅ traveler가 받은 리뷰 조회
export const communityGetTravelerReviews = async (id: number) => {
  const url = `/api/v1/reviews/traveler/${id}`;
  return apiClient.get(url);
};
// ✅ 개별 게시물 조회
export const communityGetEachPost = async (id: number) => {
  const url = `/api/v1/posts/${id}`;
  return apiClient.get(url);
};

// ✅ 게시물 댓글 조회
export const communityGetPostReviews = async (postId: number) => {
  const url = `/api/v1/comments/${postId}`;
  return apiClient.get(url);
};

// 내가 쓴 글 조회
export const communityGetMyPosts = async () => {
  const url = `/api/v1/posts/my`;
  return apiClient.get(url);
};

// 내가 댓글 쓴 글 조회
export const communityGetMyComments = async () => {
  const url = `/api/v1/comments/my`;
  return apiClient.get(url);
};
