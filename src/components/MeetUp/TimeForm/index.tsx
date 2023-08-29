import "./time-form.scss";
import { useState } from "react";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";

import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

export default function TimeForm() {
  const [isOpenDate, setIsOpenDate] = useState(false);
  const [date, setDate] = useState<any>("");
  const [time, setTime] = useState<any>("");

  let today = new Date(); // 현재 시간을 기본으로 세팅

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="time-form-style">
        <div className="title">Time</div>
        <div className="forms-container">
          <MobileDatePicker
            defaultValue={dayjs(today)}
            className={date !== "" ? "active-text" : ""}
            onChange={value => setDate(value)}
          />

          <MobileTimePicker
            defaultValue={dayjs(today)}
            className={time !== "" ? "active-text" : ""}
            onChange={value => setTime(value)}
          />
        </div>
      </div>
    </LocalizationProvider>
  );
}
