import { addCalendar, deleteCalendar } from "@services/api/calendar";

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

export const useDeleteCalendar = () => {
  const onDeleteCalendar = async (chatId: string) => {
    try {
      const res = await deleteCalendar(chatId);
      console.log("캘린더 삭제 성공", res);
    } catch (err) {
      console.log("캘린더 삭제 실패", err);
    }
  };

  return onDeleteCalendar;
};
