import "./loginformpage.scss";
import BackNavBar from "@components/_common/backnavbar";
import LoginProgressBar from "@components/authpage/loginProgressBar";

import {
  initialKuddyProfileData,
  initialTravelerProfileData,
} from "@utils/data/userProfile";
import { useState, useEffect } from "react";

import { ReactComponent as PreviousIcon } from "@assets/icon/arrow_left.svg";
import { ReactComponent as NextIcon } from "@assets/icon/arrow_right.svg";

// form 여러개 - 따로 파일 빼서 관리하기 !
import TypeForm from "./forms/TypeForm";
import ProfileForm from "./forms/ProfileForm";
import BasicForm from "./forms/BasicForm";
import JobForm from "./forms/JobForm";

export default function LoginFormPage() {
  const [isBuddy, setIsBuddy] = useState(true); // 유저 종류 구분
  // initial data
  const [data, setData] = useState(
    isBuddy ? initialKuddyProfileData : initialTravelerProfileData,
  );
  // completed 값 계산하기
  let completed = 50;

  // form page 컴포넌트들 (순서와, visible)
  const pages = [];

  return (
    <div className="login-form-page">
      <BackNavBar middleTitle="Join" />
      <LoginProgressBar completed={completed} />

      {/* 바뀌는 폼 부분 */}
      {/* <TypeForm /> */}
      {/* <ProfileForm /> */}
      {/* <BasicForm /> */}
      <JobForm />

      <div className="btns-contrainer">
        <div className="previous">
          <PreviousIcon className="previous-icon" />
          <p>Previous</p>
        </div>
        <div className="next">
          <p>next</p>
          <NextIcon className="next-icon" />
        </div>
      </div>
    </div>
  );
}
