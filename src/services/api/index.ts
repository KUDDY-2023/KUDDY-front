import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_HOST || "/",
  withCredentials: true,
});

const accessToken = localStorage.getItem("accessToken");

apiClient.defaults.headers.common["Authorization"] = accessToken
  ? `Bearer ${accessToken}`
  : "";

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
