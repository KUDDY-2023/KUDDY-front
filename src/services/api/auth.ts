import axios from "axios";
import { apiClient } from ".";

/**
 * 유저와 관련된 api
 * api 함수 이름 규칙 : auth + 동사(method) + 목적어
 * 단순히 res.data만을 리턴
 * 그 외 복잡한 로직은 hooks에서 처리
 */

// ✅ 토큰 재발급
export const authGetRefreshToken = async () => {
  const url = `/api/v1/token/refresh`;
  // const headers = {
  //   Cookie: `refreshToken=${refreshToken}`,
  // };
  // 헤더는 알아서 들어갈 듯?
  return apiClient.post(url);
};

// 유저 신고
export const authReportUser = (report: IReport) => {
  const url = `/api/v1/reports`;
  return apiClient.post(url, report);
};

// 회원 탈퇴
export const authDeleteAccount = async () => {
  const url = `/api/v1/members`;
  return apiClient.delete(url).then(res => {
    return res.data;
  });
};
