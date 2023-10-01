import { apiClient } from ".";

// ✅ 캘린더 일정 추가
export const addCalendar = async (chatId: string) => {
  const url = `api/v1/notifications/calendars/${chatId}`;
  return apiClient.post(url);
};
