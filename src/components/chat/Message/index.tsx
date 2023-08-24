import "./message.scss";
import { useState } from "react";

interface Props {
  messageType: string;
  message: string;
}

export default function Message({ messageType, message }: Props) {
  return (
    <div className="message-section">
      <div className={`message-style ${messageType}`}>
        Can we go to Gyeongbokgung Palace tour together on June 19th?
      </div>
    </div>
  );
}
