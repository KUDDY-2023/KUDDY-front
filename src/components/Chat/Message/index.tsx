import "./message.scss";
import { useState } from "react";

import Translate from "../Translate";

interface Props {
  messageType: string;
  message: IGetMessage;
}

export default function Message({ message, messageType }: Props) {
  const [reqTrans, setReqTrans] = useState(false);

  return (
    <div className="message-section">
      <div className={`message-style ${messageType}`}>
        <p>{message.content}</p>

        {messageType === "partner" && (
          <Translate
            isTranslated={reqTrans}
            message={message.content}
            onClick={() => setReqTrans(!reqTrans)}
          />
        )}
      </div>
    </div>
  );
}
