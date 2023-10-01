import { addCalendar } from "@services/api/calendar";

export const useAddCalendar = () => {
  const onAddCalendar = async (chatId: string) => {
    try {
      const res = await addCalendar(chatId);
      console.log("캘린더 스케줄 추가 성공", res);
    } catch (err) {
      console.log("캘린더 스케줄 추가 실패", err);
    }
  };

  return onAddCalendar;
};
