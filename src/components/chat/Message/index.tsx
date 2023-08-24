import "./message.scss";
import { useState } from "react";

import Translate from "../Translate";
interface Props {
  messageType: string;
  message: string;
}

export default function Message({ message, messageType }: Props) {
  const [reqTrans, setReqTrans] = useState(false);

  return (
    <div className="message-section">
      <div className={`message-style ${messageType}`}>
        <p>{message}</p>

        {messageType === "partner" && (
          <Translate
            isTranslated={reqTrans}
            message={message}
            onClick={() => setReqTrans(!reqTrans)}
          />
        )}
      </div>
    </div>
  );
}
