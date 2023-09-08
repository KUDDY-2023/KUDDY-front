import axios from "axios";
import { apiClient } from ".";

// 메세지 저장
export const chatSaveMessage = async (message: ISingleMessage) => {
  const url = "https://api.kuddy.co.kr/chat/v1/chatrooms/callback";
  return axios.post(url, message);
};
