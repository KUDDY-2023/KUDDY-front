import "./systemmessage.scss";
import { systemMessageType } from "./systemMessageType";

interface Props {
  type: number;
}

export default function SystemMessage({ type }: Props) {
  const systemMessageType = [
    { text: "Our appointment came true!", color: "yellow" },
    { text: "Our appointment was broken", color: "red" },
    { text: "how was your journey?", color: "blue" },
    { text: "Our appointment was broken", color: "red" },
  ];
  const message = systemMessageType[type];

  return (
    <div className={`system-message-style ${message.color}`}>
      {message.text}
    </div>
  );
}
