import "./loginformpage.scss";
import BackNavBar from "@components/_common/BackNavBar";
import LoginProgressBar from "@components/Auth/LoginProgressBar";
import { useState, useEffect } from "react";
import { ReactComponent as PreviousIcon } from "@assets/icon/arrow_left.svg";
import { ReactComponent as NextIconBlack } from "@assets/auth/arrow_right.svg";
import { ReactComponent as NextIconGrey } from "@assets/auth/arrow_right_grey.svg";
import { KuddyFormPages, TravelerFormPages } from "./formPages";

import { useRecoilState, useRecoilValue } from "recoil";
import { userTypeState } from "@services/store/auth";
import { useCanNext } from "@services/hooks/profile";
import { useSetDefaultProfile } from "@services/hooks/profile";

import { useCreateProfile } from "@services/hooks/profile";
import { useIsFirstLogin } from "@services/hooks/auth";

export default function LoginFormPage() {
  // 프로필 유무 확인
  // useIsFirstLogin("NOT_NEW_USER");

  // 🔥 토큰이 있는 경우에 - 프로필이 이미 있다면 /으로 돌아가기
  // 🔥 토큰이 없는 경우 /auth/register로 이동

  // 기본 정보 세팅
  useSetDefaultProfile();

  // 1) 유저 구분 값 가져오기
  const userType = useRecoilValue(userTypeState);
  const [num, setNum] = useState(0); // 페이지의 번호
  const isBuddy = userType === "KUDDY";

  const FormComponent = isBuddy
    ? KuddyFormPages[num].component
    : TravelerFormPages[num].component; // 유저별 페이지

  // completed 값 계산
  const [completed, setCompleted] = useState<number>(10 * (num + 1));

  useEffect(() => {
    setCompleted(10 * (num + 1));
  }, [num]);

  // next 버튼 함수
  const onClickNextBtn = () => {
    if (canNext && num !== 7) setNum(num + 1);
    else if (num === 7) onCreateProfile(); // 프로필 생성
  };

  // next 버튼 활성화 용
  const [canNext, setCanNext] = useState(true);

  const onCanNextNow = useCanNext();

  useEffect(() => {
    setCanNext(true);
  }, [num]);

  useEffect(() => {
    // 현재 페이지의 타입
    let currentPageType = isBuddy
      ? KuddyFormPages[num].type
      : TravelerFormPages[num].type;

    let can = onCanNextNow(currentPageType);
    setCanNext(can);
  });

  const { onCreateProfile } = useCreateProfile();

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
          onClick={onClickNextBtn}
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
