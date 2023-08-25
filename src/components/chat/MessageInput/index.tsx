import "./messageinput.scss";
import { useState } from "react";
import { ReactComponent as SendIcon } from "@assets/icon/chat/send.svg";
import { ReactComponent as MakeMeetupBtn } from "@assets/icon/chat/bt_meetup.svg";

interface Props {
  meetupBtnVisible: boolean;
}

export default function MessageInput({ meetupBtnVisible }: Props) {
  const [newMessage, setNewMessage] = useState("");

  return (
    <div className="message-input-style">
      {meetupBtnVisible && <MakeMeetupBtn className="make-meetup-btn" />}

      <div className="input-box">
        <input
          placeholder="Find your own buddy!"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
        />
        <SendIcon />
      </div>
    </div>
  );
}
