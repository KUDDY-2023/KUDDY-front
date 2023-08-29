import "./time-form.scss";
import { useState } from "react";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";

import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

export default function TimeForm() {
  const [isOpenDate, setIsOpenDate] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="time-form-style">
        <div className="title">Time</div>
        <div className="forms-container">
          <MobileDatePicker defaultValue={dayjs("2023-08-27")} />

          <MobileTimePicker defaultValue={dayjs("2022-04-17T15:30")} />
        </div>
      </div>
    </LocalizationProvider>
  );
}
