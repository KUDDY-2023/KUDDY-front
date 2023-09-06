import axios from "axios";
import { apiClient } from ".";

/**
 * 유저와 관련된 api
 * api 함수 이름 규칙 : auth + 동사(method) + 목적어
 * 단순히 res.data만을 리턴
 * 그 외 복잡한 로직은 hooks에서 처리
 */

// ✅ 토큰 재발급

export const axiosTemp = axios.create({
  baseURL: process.env.REACT_APP_API_HOST || "/",
  withCredentials: true,
});
axiosTemp.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  "accessToken",
)}`;

export const authGetRefreshToken = async () => {
  const url = `/api/v1/token/refresh`;
  return axiosTemp.post(url);
};

// ✅ 로그아웃
export const authLogOut = async (accessToken: string) => {
  const url = `/api/v1/token/blacklist`;
  return apiClient.post(url, { accessToken: accessToken });
};

// 회원 탈퇴
export const authDeleteAccount = async () => {
  const url = `/api/v1/members`;
  return apiClient.delete(url).then(res => {
    return res.data;
  });
};
