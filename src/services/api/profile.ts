import { apiClient, updateAuthHeader } from ".";

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

// 티켓 정보 생성
export const profileCreateTicketInfo = (ticketImageUrl: string) => {
  const url = `/api/v1/members/ticket`;
  return apiClient.post(url, { ticketImageUrl: ticketImageUrl });
};

// 티켓 이미지 수정
export const profilePatchTicketImage = (ticketImageUrl: string) => {
  const url = `/api/v1/members/ticket`;
  return apiClient.patch(url, { ticketImageUrl: ticketImageUrl });
};

// 티켓 상태 수정 (테스트용)
export const profilePatchTicketStatus = (
  ticketStatus: string,
  memberEmail: string,
) => {
  const url = `/api/v1/members/ticket/status`;
  return apiClient.patch(url, {
    ticketStatus: ticketStatus,
    memberEmail: memberEmail,
  });
};

// 티켓 정보 조회
export const profileGetTicketInfo = () => {
  const url = `/api/v1/members/ticket`;
  return apiClient.get(url);
};

// ✅ 닉네임로 프로필 조회
export const profileGetProfileByName = (nickname: string) => {
  const url = `/api/v1/profiles?nickname=${nickname}`;
  return apiClient.get(url);
};

// 프로필 검색 필터링
type GetProfileProps = {
  page: number;
  size: number;
  filter: ProfileGetByFilterType;
};
export const profileGetByFilter = ({ page, size, filter }: GetProfileProps) => {
  const url = `/api/v1/profiles/search?page=${page}&size=${size}`;
  return apiClient.post(url, filter);
};

// ✅ 프로필 수정
export const profilePutModify = (profile: any) => {
  const url = `/api/v1/members/profile`;
  return apiClient.put(url, profile);
};

// K-Buddy Top5 유저 조히
export const profileGetTop5 = () => {
  const url = `/api/v1/profiles/kuddy/top5`;
  return apiClient.get(url);
};

// 리뷰 삭제
export const profileDeleteReview = (id: number) => {
  const url = `/api/v1/reviews/${id}`;
  return apiClient.delete(url);
};
