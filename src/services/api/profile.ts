import { apiClient } from ".";

// ✅ 닉네임 중복 확인
export const profileCheckNickname = async (nickname: string) => {
  const url = `/api/v1/members/nickname?nickname="${nickname}"`;
  return apiClient.get(url);
};
