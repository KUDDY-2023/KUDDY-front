import "./translate.scss";
import { useState, useEffect } from "react";

interface Props {
  isTranslated: boolean;
  message: string;
  onClick: () => void;
}

export default function Translate({ isTranslated, message, onClick }: Props) {
  const [translatedText, setTranslatedText] = useState("");

  useEffect(() => {
    if (isTranslated) {
      let result = "안녕하세요! 초대장 보내드릴게요 :)";
      console.log("번역 요청"); // 번역 요청 api 코드 넣기
      setTranslatedText(result);
    }
  }, [isTranslated]);

  return (
    <div>
      {isTranslated ? (
        <div id="translate-box">
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
