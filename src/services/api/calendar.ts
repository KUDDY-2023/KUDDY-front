import { apiClient } from ".";

// ✅ 캘린더 일정 추가
export const addCalendar = async (meetupId: number) => {
  const url = `api/v1/notifications/calendars/${meetupId}`;
  return apiClient.post(url);
};

// 캘린더 일정 삭제
export const deleteCalendar = async (chatId: string) => {
  const url = `/api/v1/notifications/calendars/${chatId}`;
  return apiClient.delete(url);
};

// 캘린더 access token 발급
export const getAccessCalendar = async (token: any) => {
  const url = `/api/v1/token/calendar`;
  return apiClient.post(url, token);
};
