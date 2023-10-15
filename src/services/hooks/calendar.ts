import { useNavigate } from "react-router-dom";
import {
  addCalendar,
  deleteCalendar,
  getAccessCalendar,
} from "@services/api/calendar";
import {
  accessCalendarAlert,
  failAddCalendarAlert,
} from "@components/_common/SweetAlert";

export const useAddCalendar = () => {
  const onAddCalendar = async (meetupId: number) => {
    try {
      const res = await addCalendar(meetupId);
      return res.data.status;
    } catch (err: any) {
      console.log("캘린더 스케줄 추가 실패", err);
      return err.response.status;
    }
  };

  return onAddCalendar;
};

export const useDeleteCalendar = () => {
  const onDeleteCalendar = async (chatId: string) => {
    try {
      const res = await deleteCalendar(chatId);
    } catch (err) {
      console.log("캘린더 삭제 실패", err);
    }
  };

  return onDeleteCalendar;
};

// 일정 권한 요청
export const useCalendarPermission = () => {
  const onCalendarPermission = () => {
    const CLIENT_MAIN_URL = process.env.REACT_APP_REACT_URL;
    const CLIENT_ID = process.env.REACT_APP_REST_KAKAO_API_KEY;
    const REDIRECT_URI = `${CLIENT_MAIN_URL}/auth/calendar`;
    const URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=talk_calendar`;

    window.location.href = URL;
  };

  return onCalendarPermission;
};

// Access Token 저장
export const useAccessCalendar = () => {
  const nav = useNavigate();

  const onAccessCalendar = async () => {
    try {
      const code = new URLSearchParams(window.location.search).get("code");
      const token = { code: code };
      const res = await getAccessCalendar(token);
      nav("/my/appointment");
      accessCalendarAlert();
    } catch (err) {
      console.log(err);
      nav("/my/appointment");
      failAddCalendarAlert();
    }
  };

  return onAccessCalendar;
};
