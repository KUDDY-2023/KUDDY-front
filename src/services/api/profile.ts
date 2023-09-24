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

// 티켓 상태 수정
export const profilePatchTicketStatus = (ticketStatus: string) => {
  const url = `/api/v1/members/ticket/status`;
  updateAuthHeader(process.env.REACT_APP_SERVER_ADMIN_TOKEN);
  return apiClient.patch(url, {
    ticketStatus: ticketStatus,
    memberEmail: "kate0529@naver.com",
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

// 프로필 커디 목록 전체 조회
type GetProfileProps = {
  page: number;
  size: number;
};
export const profileGetAllKuddy = ({ page, size }: GetProfileProps) => {
  const url = `/api/v1/profiles/kuddy?page=${page}&size=${size}`;
  return apiClient.get(url);
};

// 프로필 여행자 목록 전체 조회
export const profileGetAllTraveler = ({ page, size }: GetProfileProps) => {
  const url = `/api/v1/profiles/traveler?page=${page}&size=${size}`;
  return apiClient.get(url);
};

// 프로필 검색 필터링
export const profileGetByFilter = (filter: ProfileGetByFilterType) => {
  const url = `/api/v1/profiles/search`;
  return apiClient.post(url, filter);
};

// ✅ 프로필 수정
export const profilePutModify = (profile: any) => {
  const url = `/api/v1/members/profile`;
  return apiClient.put(url, profile);
};
