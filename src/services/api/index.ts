import axios from "axios";
import { authGetRefreshToken } from "./auth";
import { useAuthReLogin } from "@services/hooks/auth";

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_HOST || "/",
  withCredentials: true,
});

apiClient.interceptors.response.use(
  response => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await authGetRefreshToken();
        const newAccessToken = res.data.data.accessToken;

        console.log("토큰 재발급 요청 결과 >> ", res);

        if (newAccessToken) {
          const ReLogin = useAuthReLogin();
          ReLogin(newAccessToken);
          originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
        }

        return axios(originalRequest);
      } catch (err) {
        console.log("토큰 재발급 실패 ", err);
        alert("다시 로그인해주세요!");
        // window.location.href = `${process.env.REACT_APP_REACT_URL}/auth/register`;
      }
    }
    return Promise.reject(error);
  },
);

// 헤더 비우는 훅
export const initAuthHeader = () => {
  // eslint-disable-next-line dot-notation
  apiClient.defaults.headers.common["Authorization"] = "";
};

// 바뀐 accessToken 적용하는 hook
export const updateAuthHeader = (newAccessToken = "") => {
  // eslint-disable-next-line dot-notation
  if (!newAccessToken) {
    initAuthHeader();
    return;
  }
  apiClient.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
};

const accessToken = localStorage.getItem("accessToken");
updateAuthHeader(accessToken || "");
