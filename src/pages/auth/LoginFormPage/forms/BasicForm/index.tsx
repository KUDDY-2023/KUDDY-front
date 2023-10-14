import "./basicform.scss";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { profileState } from "@services/store/auth";
import { useUpdateProfile } from "@services/hooks/profile";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import useIsBeforeToday from "@utils/hooks/useIsValidDate";

export default function BasicForm() {
  const [checkBeforeToday, _] = useIsBeforeToday();
  const [invalidDate, setInvalidDate] = useState(false);

  const [profile, setProfile] = useRecoilState(profileState); // 전역상태
  const [gender, setGender] = useState([
    profile.genderType === "MR",
    profile.genderType === "MS",
    profile.genderType === "N",
  ]); // 성별

  const [birth, setBirth] = useState<any>(profile.birthDate); // 생일 전역
  let today = new Date(); // 현재 시간을 기본으로 세팅

  const onUpdateProfile = useUpdateProfile(); // 전역 수정하는 hook

  const _handleClickGenderBtn = (sex: string) => {
    let newGender = [false, false, false];
    let newProfileGender = "";

    if (sex === "M") {
      newGender = [true, false, false];
      newProfileGender = "MR";
    } else if (sex === "F") {
      newGender = [false, true, false];
      newProfileGender = "MS";
    } else {
      newGender = [false, false, true];
      newProfileGender = "NEUTRAL";
    }

    setGender(newGender);
    onUpdateProfile({ genderType: newProfileGender });
  };

  const formatDate = (inputDateString: string) => {
    let dateParts = String(inputDateString).split(" ");
    let extractedDate = dateParts.slice(1, 4).join(" ");

    let parsedDate = new Date(extractedDate); // 추출한 부분을 Date 객체로 파싱

    // 날짜를 "2021-11-05" 형식으로 포맷팅
    let formattedDate =
      parsedDate.getFullYear() +
      "." +
      ("0" + (parsedDate.getMonth() + 1)).slice(-2) +
      "." +
      ("0" + parsedDate.getDate()).slice(-2);

    return formattedDate;
  };

  //  앞 자리 0은 삭제하는 로직
  const _handleSetAge = (newBirth: string) => {
    setBirth(newBirth);
    onUpdateProfile({ birthDate: newBirth }); // 전역 반영
  };

  return (
    <div className="basic-form-container">
      <p className="title">Fill your basic information</p>

      <div className="form-container">
        <div className="gender-form-container">
          <p>Gender</p>
          <div className="buttons-box-container">
            <div
              className="gender-btn"
              id={gender[0] ? "active" : ""}
              onClick={() => _handleClickGenderBtn("M")}
            >
              Male
            </div>
            <div
              className="gender-btn"
              id={gender[1] ? "active" : ""}
              onClick={() => _handleClickGenderBtn("F")}
            >
              Female
            </div>
            <div
              className="gender-btn"
              id={gender[2] ? "active" : ""}
              onClick={() => _handleClickGenderBtn("N")}
            >
              Prefer not to say
            </div>
          </div>
        </div>
        <div className="age-form-container">
          <p>Birth</p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              defaultValue={dayjs(birth || today)}
              className={birth !== "" ? "active-text" : ""}
              onChange={(value: any) => {
                // 오늘 이전만 선택 가능
                const selectedDate = formatDate(value.$d);

                if (!checkBeforeToday(selectedDate)) {
                  _handleSetAge("");
                  setInvalidDate(true);
                } else {
                  _handleSetAge(selectedDate);
                  setInvalidDate(false);
                }
              }}
            />
          </LocalizationProvider>
        </div>
        {invalidDate && <p id="alert">This is not a valid date of birth.</p>}
      </div>
    </div>
  );
}
