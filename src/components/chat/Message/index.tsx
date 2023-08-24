import "./message.scss";
import { useState } from "react";

interface Props {
  messageType: string;
  message: string;
}

export default function Message({ message, messageType }: Props) {
  return (
    <div className="message-section">
      <div className={`message-style ${messageType}`}>{message}</div>
    </div>
  );
}
