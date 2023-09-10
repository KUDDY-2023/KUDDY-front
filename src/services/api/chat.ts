import axios from "axios";
import { apiClient } from ".";

// ✅ 채팅방 리스트 정보 가져오기
export const chatRooms = async () => {
  const url = "chat/v1/chatrooms";
  return apiClient.get(url);
};

// ✅ 메세지 저장
export const chatSaveMessage = async (message: ISingleMessage) => {
  const url = "https://api.kuddy.co.kr/chat/v1/chatrooms/callback";
  return axios.post(url, message);
};