import "./message.scss";
import { useState } from "react";

import Translate from "../Translate";

interface Props {
  messageType: string;
  message: IGetMessage;
}

export default function Message({ message, messageType }: Props) {
  const [reqTrans, setReqTrans] = useState(false);

  const calculateTime = (utcMilliseconds: number) => {
    const localeTime = new Date(utcMilliseconds).toLocaleTimeString();

    const timeMatch = localeTime.match(/(\d+):(\d+):/);

    if (timeMatch && timeMatch.length === 3) {
      const hour = parseInt(timeMatch[1], 10);
      const minute = parseInt(timeMatch[2], 10);

      // 오후인 경우에는 시간에 12를 더해줌
      const formattedHour = localeTime.includes("오후")
        ? (hour + 12) % 24
        : hour;

      // "HH:MM" 형식으로 조합
      return `${formattedHour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
    }
  };

  return (
    <div className="message-section">
      <div className={`message-style ${messageType}`}>
        <p className="message-text-p">{message.content}</p>

        {messageType === "partner" && (
          <Translate
            isTranslated={reqTrans}
            message={message.content}
            onClick={() => setReqTrans(!reqTrans)}
          />
        )}

        <p
          className={`${
            messageType === "my" ? "mySentTime" : "partnerSentTime"
          } send-time`}
        >
          {calculateTime(message.sendTime)}
        </p>
      </div>
    </div>
  );
}
