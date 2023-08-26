import "./systemmessage.scss";
import { systemMessageType } from "./systemMessageType";

interface Props {
  type: keyof typeof systemMessageType;
}

export default function SystemMessage({ type }: Props) {
  const message = systemMessageType[type];

  return (
    <div className={`system-message-style ${message.color}`}>
      {message.text}
    </div>
  );
}
