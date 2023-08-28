import "./loginformpage.scss";
import BackNavBar from "@components/_common/BackNavBar";
import LoginProgressBar from "@components/authpage/LoginProgressBar";

import {
  initialKuddyProfileData,
  initialTravelerProfileData,
} from "@utils/data/userProfile";
import { useState, useEffect } from "react";

import { ReactComponent as PreviousIcon } from "@assets/icon/arrow_left.svg";
import { ReactComponent as NextIcon } from "@assets/icon/arrow_right.svg";

import { FormPages } from "./formPages";

export default function LoginFormPage() {
  const [isBuddy, setIsBuddy] = useState(true); // 유저 종류 구분
  // initial data
  const [data, setData] = useState(
    isBuddy ? initialKuddyProfileData : initialTravelerProfileData,
  );
  // completed 값 계산
  let completed = 50;

  const [num, setNum] = useState(1);
  const FormComponent = FormPages[num];

  return (
    <div className="login-form-page">
      <BackNavBar middleTitle="Join" isShare={false} />
      <LoginProgressBar completed={completed} />

      <FormComponent />

      <div className="btns-contrainer">
        <div className="previous" onClick={() => setNum(num - 1)}>
          <PreviousIcon className="previous-icon" />
          <p>Previous</p>
        </div>
        <div className="next" onClick={() => setNum(num + 1)}>
          <p>next</p>
          <NextIcon className="next-icon" />
        </div>
      </div>
    </div>
  );
}
