import { apiClient } from ".";

// ✅ 닉네임 중복 확인
export const profileCheckNickname = async (nickname: string) => {
  const url = `/api/v1/members/nickname?nickname=${nickname}`;
  return apiClient.get(url);
};

// ✅ 유저 로그인 정보 조회
// 카카오 프로필 이미지와 닉네임 반환
export const profileGetSocialProfile = async () => {
  const url = `/api/v1/members/me`;
  return apiClient.get(url);
};

// ✅ 프로필 정보 조회
export const profileGetProfile = async () => {
  const url = `/api/v1/members/profile`;
  return apiClient.get(url);
};

// ✅ 프로필 최초 생성
export const profileCreateTheFirstProfile = (profile: any) => {
  const url = `/api/v1/members/profile`;
  return apiClient.post(url, profile);
};
