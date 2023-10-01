import "./translate.scss";
import { useState, useEffect } from "react";

import { useTranslate } from "@services/hooks/translate";

// 전역 - 유저 정보
import { useRecoilValue } from "recoil";
import { userInfoState } from "@services/store/auth";

interface Props {
  isTranslated: boolean;
  message: string;
  onClick: () => void;
}

export default function Translate({ isTranslated, message, onClick }: Props) {
  const [translatedText, setTranslatedText] = useState("");
  const { role } = useRecoilValue(userInfoState);

  const onTranslate = useTranslate();

  const setTranslateResult = async () => {
    // 커디 유저면 : 한국어로
    // 여행자 유저면 : 영어로
    let target = role === "KUDDY" ? "ko" : "en";
    const result = await onTranslate(message, target);
    setTranslatedText(result);
  };

  useEffect(() => {
    if (isTranslated) {
      setTranslateResult();
    }
  }, [isTranslated]);

  return (
    <div>
      {isTranslated ? (
        <div id="translate-box" onClick={onClick}>
          <p id="tanslate-text">{translatedText}</p>
          <p id="translate-btn-text">translated</p>
        </div>
      ) : (
        <p id="translate-btn-text" onClick={onClick}>
          translate
        </p>
      )}
    </div>
  );
}
