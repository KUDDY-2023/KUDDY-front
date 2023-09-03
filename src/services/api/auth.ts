import axios from "axios";
import { apiClient } from ".";

/**
 * 유저와 관련된 api
 * api 함수 이름 규칙 : auth + 동사(method) + 목적어
 * 단순히 res.data만을 리턴
 * 그 외 복잡한 로직은 hooks에서 처리
 */

// ✅ 토큰 재발급
export const authGetRefreshToken = async (refreshToken: string) => {
  const url = `/api/v1/auth/token/refresh`;
  const headers = {
    Cookie: `refreshToken=${refreshToken}`,
  };
  return apiClient.post(url, {}, { headers: headers }).then(res => {
    return res.data;
  });
};

// 소셜 로그인 테스트
export const test = async () => {
  const url = `https://api.kuddy.co.kr/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/`;

  return apiClient.get(url).then(res => console.log(res));
};

// 유저 신고
export const authReportUser = (report: IReport) => {
  const url = `/api/v1/reports`;
  return apiClient.post(url, report).then(res => {
    return res.data;
  });
};

// 회원 탈퇴
export const authDeleteAccount = async () => {
  const url = `/api/v1/members`;
  return apiClient.delete(url).then(res => {
    return res.data;
  });
};

// 프로필 생성
export const authCreateProfile = (name: IUserProfile) => {
  const url = `/api/v1/members/profile`;
  return apiClient.post(url, name).then(res => {
    return res.data;
  });
};
