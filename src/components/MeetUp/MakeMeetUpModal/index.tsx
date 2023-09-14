import "./make-meet-up-modal.scss";
import { useState, useEffect } from "react";
import EventBtn from "@components/_common/EventBtn";
import PlaceForm from "../PlaceForm";
import TimeForm from "../TimeForm";
import PayForm from "../PayForm";
import BottomUpModal from "@components/_common/BottomUpModal";

// 채팅
import { MutableRefObject } from "react";
import { CompatClient } from "@stomp/stompjs";

import { useSaveMessage } from "@services/hooks/chat";

interface Props {
  isModalOpen: boolean;
  onClose: () => void;
  client: MutableRefObject<CompatClient | undefined>;
  roomId: string;
  myEmail: string;
  myNickname: string;
  handleMyMessage: (msg: any) => void;
}
export default function MakeMeetUpModal({
  isModalOpen,
  onClose,
  client,
  roomId,
  myEmail,
  myNickname,
  handleMyMessage,
}: Props) {
  const onSave = useSaveMessage();

  const token = window.localStorage.getItem("accessToken") as string;

  // ✅ 동행 메세지 보내기
  let meetUpMsg: ISingleMessage = {
    id: null,
    roomId: roomId as string,
    contentType: "MEETUP",
    content: "동행",
    senderName: myNickname, // 내 닉네임
    senderEmail: myEmail,
    senderId: 1, // 보내는 사람의 id
    sendTime: new Date().getTime(),
    spotContentId: null, // 장소 id
    spotName: null, // 장소 이름
    appointmentTime: null, // 시간 2021-11-05 13:47:13.248
    price: null, // 가격 정수로 $
    meetStatus: "NOT_ACCEPT",
    readCount: 1,
    isUpdated: 0,
  };

  // 임시
  let test: ISingleMessage = {
    id: null,
    roomId: roomId as string,
    contentType: "MEETUP",
    content: "동행",
    senderName: myNickname, // 내 닉네임
    senderEmail: myEmail,
    senderId: 7, // 보내는 사람의 id
    sendTime: new Date().getTime(),
    spotContentId: 2, // 장소 id
    spotName: "test place", // 장소 이름
    appointmentTime: "2021-11-05 13:47:13.248", // 시간 2021-11-05 13:47:13.248
    price: 40, // 가격 정수로 $
    meetStatus: "NOT_ACCEPT",
    readCount: 1,
    isUpdated: 0,
  };

  const onSendMeetUpMessage = async () => {
    if (client.current) {
      try {
        let newText = { ...test }; // 복사

        // ✅ 내 메세지는 바로 반영하기
        handleMyMessage(newText);

        // ✅ 채팅 보내는 send (publish)
        client.current.send(
          "/app/message",
          { Authorization: `Bearer ${token}` },
          JSON.stringify(newText),
        );

        onClose(); // 창 닫기

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
    <BottomUpModal
      isModalOpen={isModalOpen}
      onClose={onClose}
      navbarHeight={47}
      isWhiteBackground={false}
    >
      <div id="meet-up-container">
        <h2>Set meet up</h2>

        <div className="form-container">
          <PlaceForm />
          <TimeForm />
          <PayForm />
        </div>

        <EventBtn
          btnName="Send invitaion"
          isActive={true}
          onClick={onSendMeetUpMessage}
        />
      </div>
    </BottomUpModal>
  );
}
