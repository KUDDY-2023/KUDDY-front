import "./time-form.scss";
import { useState, useEffect } from "react";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

import { useMakeMeetUpInfo } from "@services/hooks/chat";

export default function TimeForm() {
  const onMakeMeetUpInfo = useMakeMeetUpInfo(); // meetup 전역 업데이트 훅
  const [date, setDate] = useState<any>("");
  const [time, setTime] = useState<any>("");
  let today = new Date(); // 현재 시간을 기본으로 세팅

  const formatDate = (inputDateString: string) => {
    let dateParts = String(inputDateString).split(" ");
    let extractedDate = dateParts.slice(1, 4).join(" ");

    let parsedDate = new Date(extractedDate); // 추출한 부분을 Date 객체로 파싱

    // 날짜를 "2021-11-05" 형식으로 포맷팅
    let formattedDate =
      parsedDate.getFullYear() +
      "-" +
      ("0" + (parsedDate.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + parsedDate.getDate()).slice(-2);

    return formattedDate;
  };

  const formatTime = (inputDateString: string) => {
    // 주어진 문자열을 Date 객체로 파싱
    const parsedDate = new Date(inputDateString);

    // 시, 분, 초, 밀리초 추출
    let hours = ("0" + parsedDate.getHours()).slice(-2);
    const minutes = ("0" + parsedDate.getMinutes()).slice(-2);
    const seconds = ("0" + parsedDate.getSeconds()).slice(-2);
    const milliseconds = "000";

    // 시간을 24시간 형식으로 조정
    if (hours === "00") {
      hours = "24";
    }

    // 변환된 형식으로 조합
    const customTimeFormat =
      hours + ":" + minutes + ":" + seconds + "." + milliseconds;

    return customTimeFormat;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="time-form-style">
        <div className="title">Time</div>
        <div className="forms-container">
          <MobileDatePicker
            defaultValue={dayjs(today)}
            className={date !== "" ? "active-text" : ""}
            onChange={(value: any) => {
              // 날짜가 오늘인지 판단해야함 애초에 누를 수 없게 조정하기

              onMakeMeetUpInfo({ appointmentTimeD: formatDate(value.$d) });

              setDate(value);
            }}
          />

          <MobileTimePicker
            defaultValue={dayjs(today)}
            className={time !== "" ? "active-text" : ""}
            onChange={(value: any) => {
              onMakeMeetUpInfo({ appointmentTimeT: formatTime(value.$d) });
              console.log(formatTime(value.$d));
              setTime(value);
            }}
          />
        </div>
      </div>
    </LocalizationProvider>
  );
}
