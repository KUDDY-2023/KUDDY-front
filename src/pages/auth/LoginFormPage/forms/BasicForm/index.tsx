import "./basicform.scss";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { profileState } from "@services/store/auth";
import { useUpdateProfile } from "@services/hooks/profile";

export default function BasicForm() {
  const [profile, setProfile] = useRecoilState(profileState); // 전역상태
  const [gender, setGender] = useState([
    profile.genderType === "MR",
    profile.genderType === "MS",
    profile.genderType === "N",
  ]); // 성별
  const [age, setAge] = useState<string>(profile.age.toString()); // 나이

  const onUpdateProfile = useUpdateProfile();

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
      newProfileGender = "N";
    }

    setGender(newGender);
    onUpdateProfile({ genderType: newProfileGender });
  };

  //  앞 자리 0은 삭제하는 로직
  const _handleSetAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    let number = e.target.value.toString();
    if (number[0] === "0") {
      number = number.slice(1);
    }
    setAge(number);
    onUpdateProfile({ age: Number(number) });
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
              Mr
            </div>
            <div
              className="gender-btn"
              id={gender[1] ? "active" : ""}
              onClick={() => _handleClickGenderBtn("F")}
            >
              Ms
            </div>
            <div
              className="gender-btn"
              id={gender[2] ? "active" : ""}
              onClick={() => _handleClickGenderBtn("N")}
            >
              Neutral
            </div>
          </div>
        </div>
        <div className="age-form-container">
          <p>Age</p>
          <input type="number" value={age} onChange={e => _handleSetAge(e)} />
        </div>
      </div>
    </div>
  );
}
