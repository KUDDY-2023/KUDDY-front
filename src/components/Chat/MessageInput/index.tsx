import "./messageinput.scss";
import { useState, useRef, useCallback, useEffect } from "react";
import { ReactComponent as SendIcon } from "@assets/chat/chat_send.svg";
import { ReactComponent as MakeMeetupBtn } from "@assets/chat/bt_meetup.svg";
import TextareaAutosize from "react-textarea-autosize";

interface Props {
  meetupBtnVisible: boolean;
  onMakeMeetUp: () => void;
}

export default function MessageInput({
  meetupBtnVisible,
  onMakeMeetUp,
}: Props) {
  const [newMessage, setNewMessage] = useState("");
  const [inputHeight, setInputHeight] = useState<number>(0);
  const [radius, setRadius] = useState<string>("radius-first");

  useEffect(() => {
    // 38 55 72 89
    if (inputHeight >= 38) setRadius("radius");
  }, [inputHeight]);

  return (
    <div className="message-input-style">
      {meetupBtnVisible && (
        <MakeMeetupBtn className="make-meetup-btn" onClick={onMakeMeetUp} />
      )}

      <div className="input-box" id={radius}>
        <TextareaAutosize
          onHeightChange={(height: number) => {
            setInputHeight(height);
            console.log(height);
          }}
          maxRows={5}
          placeholder="Find your own buddy!"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
        />
        <div className="send-icon-container">
          <SendIcon />
        </div>
      </div>
    </div>
  );
}
