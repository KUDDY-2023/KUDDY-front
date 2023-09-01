import "./basicform.scss";
import { useState } from "react";

export default function BasicForm() {
  const [gender, setGender] = useState([true, false, false]);
  const [age, setAge] = useState<string>("0");

  const _handleClickGenderBtn = (sex: string) => {
    if (sex === "M") {
      setGender([true, false, false]);
    } else if (sex === "F") {
      setGender([false, true, false]);
    } else {
      setGender([false, false, true]);
    }
  };

  //  앞 자리 0은 삭제해야함
  const _handleSetAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    let number = e.target.value.toString();
    if (number[0] === "0") {
      number = number.slice(1);
    }
    setAge(number);
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
