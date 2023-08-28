import "./basicform.scss";
import { useState } from "react";

export default function BasicForm() {
  const [gender, setGender] = useState([true, false]);
  const [age, setAge] = useState<number>(0);

  const _handleClickGenderBtn = (sex: string) => {
    if (sex === "M") {
      setGender([true, false]);
    } else if (sex === "F") {
      setGender([false, true]);
    }
  };

  return (
    <div className="basic-form-container">
      <p className="title">Fill your basic information</p>

      <div className="form-container">
        <div className="left-box">
          <p>Gender</p>
          <p>Age</p>
        </div>
        <div className="right-box">
          <div className="buttons-box-flex">
            <div
              className="gender-btn"
              id={gender[0] ? "active" : ""}
              onClick={() => _handleClickGenderBtn("M")}
            >
              Mr
            </div>
            <div
              className="gender-btn right"
              id={gender[1] ? "active" : ""}
              onClick={() => _handleClickGenderBtn("F")}
            >
              Ms
            </div>
          </div>
          <input
            type="number"
            value={age}
            onChange={e => setAge(parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
