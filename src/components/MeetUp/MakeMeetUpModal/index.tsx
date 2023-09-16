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

import { useRecoilValue, useResetRecoilState } from "recoil";
import { meetUpInfoState } from "@services/store/chat";

interface Props {
  isModalOpen: boolean;
  onClose: () => void;
  client: MutableRefObject<CompatClient | undefined>;
  roomId: string;
  myEmail: string;
  myNickname: string;
  memberId: number;
  handleMyMessage: (msg: any) => void;
}
export default function MakeMeetUpModal({
  isModalOpen,
  onClose,
  client,
  roomId,
  myEmail,
  memberId,
  myNickname,
  handleMyMessage,
}: Props) {
  const meetInfo = useRecoilValue(meetUpInfoState); // 전역 상태
  const resetMeetInfo = useResetRecoilState(meetUpInfoState); // 전역 상태 초기화

  const [isActive, setIsActive] = useState(false);

  const onSave = useSaveMessage();

  const token = window.localStorage.getItem("accessToken") as string;

  // ✅ 동행 메세지 보내기
  let meetUpMsg: ISingleMessage = {
    id: null,
    roomId: roomId as string,
    contentType: "MEETUP",
    content: "동행",
    senderName: myNickname, // 내 닉네임
    senderEmail: myEmail, // 내 이메일
    senderId: memberId, // 보내는 사람의 id
    sendTime: new Date().getTime(),
    spotContentId: meetInfo.spotContentId, // 장소 id
    spotName: meetInfo.spotName, // 장소 이름
    appointmentTime: `${meetInfo.appointmentTimeD} ${meetInfo.appointmentTimeT}`, //"2021-11-05 13:47:13.248"
    price: meetInfo.price, // 가격 정수로 $
    meetStatus: "NOT_ACCEPT",
    readCount: 1,
    isUpdated: 0,
  };

  useEffect(() => {
    if (
      meetInfo.spotContentId !== null &&
      meetInfo.spotName !== null &&
      meetInfo.appointmentTimeD !== null &&
      meetInfo.appointmentTimeT !== null &&
      meetInfo.price !== null
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [meetInfo]);

  const onSendMeetUpMessage = async () => {
    if (client.current) {
      try {
        // ✅ DB에 메세지 반영하기
        console.log("저장 시도", meetUpMsg);
        const savedMsg = await onSave(meetUpMsg);
        console.log("저장한거 >>> ", savedMsg);

        // ✅ 내 메세지는 바로 반영하기
        handleMyMessage(savedMsg);
        onClose(); // 창 닫기

        // ✅ 채팅 보내는 send (publish)
        client.current.send(
          "/app/message",
          { Authorization: `Bearer ${token}` },
          JSON.stringify(savedMsg),
        );

        // ✅ 전역 상태 비우기
        resetMeetInfo();
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
          isActive={isActive}
          onClick={onSendMeetUpMessage}
        />
      </div>
    </BottomUpModal>
  );
}
