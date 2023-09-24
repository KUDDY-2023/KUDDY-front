import { apiClient } from ".";

// ✅ 모든 알림 조회
export const nofiGetAll = async () => {
  const url = `/api/v1/notifications?page=0&size=10`;
  return apiClient.get(url);
};

// ✅ 모든 알림 읽음 처리
export const nofiReadAll = async () => {
  const url = `/api/v1/notifications/read/list`;
  return apiClient.post(url);
};

// ✅ 단일 알림 읽음 처리
export const nofiRead = async (nofiNum: number) => {
  const url = `/api/v1/notifications/read/${nofiNum}`;
  return apiClient.post(url);
};

// ✅ 읽지 않은 알림 개수
export const nofiUnReadCount = async () => {
  const url = `/api/v1/notifications/count`;
  return apiClient.get(url);
};
