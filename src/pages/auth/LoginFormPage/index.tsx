import "./loginformpage.scss";
import BackNavBar from "@components/_common/BackNavBar";
import LoginProgressBar from "@components/Auth/LoginProgressBar";

import {
  initialKuddyProfileData,
  initialTravelerProfileData,
} from "@utils/data/userProfile";
import { useState, useEffect } from "react";

import { ReactComponent as PreviousIcon } from "@assets/icon/arrow_left.svg";
import { ReactComponent as NextIconBlack } from "@assets/auth/arrow_right.svg";
import { ReactComponent as NextIconGrey } from "@assets/auth/arrow_right_grey.svg";

import { KuddyFormPages, TravelerFormPages } from "./formPages";

export default function LoginFormPage() {
  // 유저 종류 구분 <- 전역 관리
  const [isBuddy, setIsBuddy] = useState(false);

  // 유저 프로필 initial data <- 전역 관리하면 필요 없을 듯
  const [data, setData] = useState(
    isBuddy ? initialKuddyProfileData : initialTravelerProfileData,
  );

  const [num, setNum] = useState(0); // 페이지의 번호
  const FormComponent = isBuddy ? KuddyFormPages[num] : TravelerFormPages[num]; // 유저별 페이지

  // completed 값 계산
  const [completed, setCompleted] = useState<number>(10 * (num + 1));

  useEffect(() => {
    setCompleted(10 * (num + 1));
  }, [num]);

  // 페이지가 넘어갈 때 마다 form이 채워졌는지 확인
  // next 버튼 활성화 용
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    setCanNext(true);
  }, [num]);

  return (
    <div className="login-form-page">
      <BackNavBar middleTitle="Join" isShare={false} />
      <LoginProgressBar completed={completed} />

      <FormComponent />

      <div className="btns-contrainer">
        {num != 0 && (
          <div className="previous" onClick={() => setNum(num - 1)}>
            <PreviousIcon className="previous-icon" />
            <p>Previous</p>
          </div>
        )}

        <div
          className={canNext ? "active-next" : "next"}
          onClick={() => {
            if (num !== 7) setNum(num + 1);
          }}
        >
          <p>next</p>
          {canNext ? (
            <NextIconBlack className="next-icon" />
          ) : (
            <NextIconGrey className="next-icon" />
          )}
        </div>
      </div>
    </div>
  );
}
