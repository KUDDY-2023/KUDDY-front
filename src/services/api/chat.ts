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

// ✅ 채팅방 나가기
export const chatGetOutRoom = async (roomId: string, email: string) => {
  const url = `/chat/v1/chatrooms/${roomId}?email=${email}`;
  return apiClient.delete(url);
};

// ✅ 채팅방 메세지 내용 모두 가져오기
export const chatGetAllMessage = async (roomId: string) => {
  const url = `/chat/v1/chatrooms/${roomId}`;
  return apiClient.get(url);
};

// ✅ 채팅방 여부 조회
export const chatGetRoomStatus = async (email: string) => {
  const url = `/chat/v1/chatrooms/check?email=${email}`;
  return apiClient.get(url);
};

// ✅ 채팅방 생성
export const chatCreateRoom = async (nickname: any) => {
  const url = "/chat/v1/chatrooms";
  return apiClient.post(url, nickname);
};
