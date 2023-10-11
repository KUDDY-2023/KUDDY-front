import "./messageinput.scss";
import { useState, useRef, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as SendIcon } from "@assets/chat/chat_sendv2.svg";
import { ReactComponent as MakeMeetupBtn } from "@assets/chat/bt_meetup.svg";
import TextareaAutosize from "react-textarea-autosize";

// 채팅
import { MutableRefObject } from "react";
import { CompatClient } from "@stomp/stompjs";

import { useSaveMessage } from "@services/hooks/chat";

interface Props {
  client: MutableRefObject<CompatClient | undefined>;
  meetupBtnVisible: boolean;
  onMakeMeetUp: () => void;
  roomId: string;
  myEmail: string;
  myNickname: string;
  myId: number;
  handleMyMessage: (msg: any) => void;
}

export default function MessageInput({
  client,
  meetupBtnVisible,
  onMakeMeetUp,
  roomId,
  myEmail,
  myNickname,
  myId,
  handleMyMessage,
}: Props) {
  const [newMessage, setNewMessage] = useState("");
  const [inputHeight, setInputHeight] = useState<number>(0);
  const [radius, setRadius] = useState<string>("radius-first");
  useEffect(() => {
    if (inputHeight >= 38) setRadius("radius");
  }, [inputHeight]);
  const token = window.localStorage.getItem("accessToken") as string;

  // ✅ 일반 메세지 보내기
  const onSave = useSaveMessage();
  let normalMsg: ISingleMessage = {
    id: null,
    roomId: roomId as string,
    contentType: "TEXT",
    content: newMessage,
    senderName: myNickname,
    spotContentId: null,
    appointmentTime: null,
    price: null,
    spotName: null,
    senderId: myId,
    meetStatus: null,
    sendTime: new Date().getTime(),
    senderEmail: myEmail,
    readCount: 1,
    isUpdated: 0,
  };

  const onSendMessage = async () => {
    if (client.current && newMessage !== "") {
      try {
        let newText = { ...normalMsg }; // 복사

        // ✅ 내 메세지는 바로 반영하기
        handleMyMessage(newText);

        // ✅ 채팅 보내는 send (publish)
        client.current.send(
          "/app/message",
          { Authorization: `Bearer ${token}` },
          JSON.stringify(newText),
        );

        setNewMessage(""); // input 창 비우기

        // ✅ DB에 메세지 반영하기
        const savedMsg = await onSave(newText);
        console.log("저장한거 >>> ", savedMsg);
      } catch (e) {
        alert(e);
      } finally {
        // setIsMapOpen(false);
      }
    }
  };

  return (
    <div className="message-input-style">
      <div className="make-meetup-btn-container">
        {meetupBtnVisible && (
          <MakeMeetupBtn className="make-meetup-btn" onClick={onMakeMeetUp} />
        )}
      </div>

      <div className="input-box" id={radius}>
        <TextareaAutosize
          onHeightChange={(height: number) => {
            setInputHeight(height);
          }}
          maxRows={5}
          placeholder="Find your own buddy!"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSendMessage();
            }
          }}
        />
        <div className="send-icon-container" onClick={onSendMessage}>
          <SendIcon />
        </div>
      </div>
    </div>
  );
}
