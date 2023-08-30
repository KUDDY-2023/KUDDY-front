import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_HOST || "/",
  withCredentials: true,
});

// 토큰 설정
// 🔥 그냥 로컬스토리지를 쓸건지, recoil-persist 쓸건지 고민해보기
export const initAuthHeader = () => {
  const accessToken = localStorage.getItem("accessToken"); // 로컬 스토리지에서 뽑아오기

  apiClient.defaults.headers.common.Authorization = accessToken
    ? `Bearer ${accessToken}`
    : "";
};

initAuthHeader();
