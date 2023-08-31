import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_HOST || "/",
  withCredentials: true,
});

const accessToken = localStorage.getItem("accessToken");

apiClient.defaults.headers.common["Authorization"] = accessToken
  ? `Bearer ${accessToken}`
  : null;
