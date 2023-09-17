import axios from "axios";
import { apiClient } from ".";

// 유저 신고
export const authReportUser = (report: IReport) => {
  const url = `/api/v1/reports`;
  return apiClient.post(url, report);
};

// 내 동행 리스트 조회
export const userGetMeetUps = () => {
  const url = `/api/v1/meetups`;
  return apiClient.get(url);
};

// 리뷰 작성
export const userPostReview = (review: any) => {
  const url = `/api/v1/reviews`;
  return apiClient.post(url, review);
};

// 리뷰 작성하러 가기 모달 여부 조회
export const userGetReviewModal = () => {
  const url = `/api/v1/meetups/review`;
  return apiClient.get(url);
};
