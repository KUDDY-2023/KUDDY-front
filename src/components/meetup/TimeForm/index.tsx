import "./time-form.scss";
import { useState } from "react";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";

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

        <div className="time">12:00 PM</div>
      </div>
    </LocalizationProvider>
  );
}
// MuiButtonBase-root
// MuiPickersDay-root
// Mui-selected
// MuiPickersDay-dayWithMargin
// css-qa7bje-MuiButtonBase-root-MuiPickersDay-root
