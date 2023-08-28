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
        <p className="title">Time</p>
        <MobileDatePicker
          defaultValue={dayjs("2023-08-27")}
          sx={{
            "& .MuiButtonBase-root-MuiPickersDay-root  ": { color: "red" },
          }}
        />

        <MobileTimePicker defaultValue={dayjs("2022-04-17T15:30")} />
      </div>
    </LocalizationProvider>
  );
}
