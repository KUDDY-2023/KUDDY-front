import { apiClient } from ".";

// ✅ 닉네임 중복 확인
export const profileCheckNickname = async (nickname: string) => {
  const url = `/api/v1/members/nickname?nickname="${nickname}"`;
  return apiClient.get(url);
};

// ✅ 유저 프로필 조회
export const profileGetProfile = async () => {
  const url = `/api/v1/members/profile`;
  return apiClient.get(url);
};
