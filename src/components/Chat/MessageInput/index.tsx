import "./messageinput.scss";
import { useState, useRef, useCallback, useEffect } from "react";
import { ReactComponent as SendIcon } from "@assets/chat/chat_send.svg";
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
}

export default function MessageInput({
  client,
  meetupBtnVisible,
  onMakeMeetUp,
}: Props) {
  const [newMessage, setNewMessage] = useState("");
  const [inputHeight, setInputHeight] = useState<number>(0);
  const [radius, setRadius] = useState<string>("radius-first");

  const token = window.localStorage.getItem("accessToken") as string;

  // 운영자가 보내는 메세지
  let testMsg: ISingleMessage = {
    id: null,
    roomId: "5",
    contentType: "TEXT",
    content: newMessage,
    senderName: "kuku",
    spotContentId: null,
    appointmentTime: null,
    price: null,
    spotName: null,
    senderId: 1,
    meetStatus: null,
    sendTime: new Date().getTime(),
    senderEmail: "ziyun1612@ewhain.net",
    readCount: 1,
    isUpdated: 0,
  };

  let testMeetup: ISingleMessage = {
    id: "64fb179e4a4e36075eb150ab",
    roomId: "3",
    contentType: "MEETUP",
    content: "동행",
    senderName: "maru",
    spotContentId: 1,
    appointmentTime: "2021-11-05 13:47:13.248",
    price: 10,
    spotName: "롯데타워",
    senderId: 15,
    sendTime: 16823942839,
    meetStatus: "PAYED",
    senderEmail: "dy6578ekdbs@naver.com",
    readCount: 1,
    isUpdated: 0, // 1로 보내면 업데이트 이벤트 발생, 0으로 보내면 new 메세지 이벤트 발생
  };

  let testUpdateMeetup: ISingleMessage = {
    id: "64fb179e4a4e36075eb150ab",
    roomId: "3",
    contentType: "MEETUP",
    content: "동행",
    senderName: "maru",
    spotContentId: 1,
    appointmentTime: "2021-11-05 13:47:13.248",
    price: 10,
    spotName: "롯데타워",
    senderId: 15,
    sendTime: 16823942839,
    meetStatus: "TRAVELER_CANCEL",
    senderEmail: "dy6578ekdbs@naver.com",
    readCount: 1,
    isUpdated: 1,
  };

  // 메세지 저장
  const onSave = useSaveMessage();

  const onClickSend = async () => {
    if (client.current) {
      try {
        // 먼저 저장하고, 답변으로 온걸 소켓으로 보내기
        const savedMsg = await onSave(testMsg);
        console.log(">>>>???", savedMsg);

        // ✅ 채팅 보내는 send (publish)
        client.current.send(
          "/app/message",
          { Authorization: `Bearer ${token}` },
          JSON.stringify(savedMsg),
        );
      } catch (e) {
        alert(e);
        //router.push(router.asPath);
      } finally {
        // setIsMapOpen(false);
        // setIsMenuOpen(false);
        // inputRef.current!.value = '';
        // type.current = 'text';
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
            console.log(height);
          }}
          maxRows={5}
          placeholder="Find your own buddy!"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
        />
        <div className="send-icon-container" onClick={onClickSend}>
          <SendIcon />
        </div>
      </div>
    </div>
  );
}
