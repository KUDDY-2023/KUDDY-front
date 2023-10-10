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

// policy
import { ReactComponent as CheckedBox } from "@assets/icon/check_on.svg";
import { ReactComponent as UnCheckedBox } from "@assets/icon/check_off.svg";
import { ReactComponent as Help } from "@assets/chat/bt_help.svg";
// 모달
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

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

  // refund policy
  const [check, isCheck] = useState(false);

  useEffect(() => {
    if (
      meetInfo.spotContentId !== null &&
      meetInfo.spotName !== null &&
      meetInfo.appointmentTimeD !== null &&
      meetInfo.appointmentTimeT !== null &&
      meetInfo.price !== null &&
      check
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [meetInfo, check]);

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

        // ✅ 전역 상태 비우기 & policy 해제
        resetMeetInfo();
        isCheck(false);
      } catch (e) {
        alert(e);
      } finally {
        // setIsMapOpen(false);
      }
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    overflow: "scroll",
    height: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <BottomUpModal
      isModalOpen={isModalOpen}
      onClose={onClose}
      navbarHeight={47}
      isWhiteBackground={false}
    >
      <div id="meet-up-container">
        <h2>Make an appointment</h2>

        <div className="form-container">
          <PlaceForm />
          <TimeForm />
          <PayForm check={check} isCheck={isCheck} />

          <div className="policy-container">
            {check ? (
              <CheckedBox id="checkbox" />
            ) : (
              <UnCheckedBox id="checkbox" />
            )}

            <p onClick={() => isCheck(!check)}>agree with the refund policy</p>
            <div id="help" onClick={() => setIsOpen(true)}>
              <Help />
            </div>
          </div>
        </div>

        <EventBtn
          btnName="Send invitaion"
          isActive={isActive}
          onClick={onSendMeetUpMessage}
        />
      </div>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <Box sx={style}>
          <div className="policy-detail-page">
            <h3>1. Refund of Guide Fee when Traveler Cancels an Appointment</h3>
            <h5>Kuddy fees are non-refundable.</h5>
            <ol>
              <li>
                - If canceled up to 7 days before the appointment, the guide fee
                will be 100% refunded.
              </li>
              <li>
                - If canceled up to 4 days before the appointment, the guide fee
                will be 80% refunded.
              </li>
              <li>
                - If canceled up to 1 day before the appointment, the guide fee
                will be 50% refunded.
              </li>
              <li>
                - No refund of the guide fee is available for same-day
                cancellations.
              </li>
            </ol>
            <h3>
              2. Unilateral Cancellation by the Guide User before the
              Appointment
            </h3>
            If the guide (K-buddy) user cancels companionship before the
            appointment, the guide fee, including Kuddy fees, will be
            automatically refunded in full to the traveler user.
            <h3>3. Inability to Fulfill the Appointment due to Other Issues</h3>
            You must inquire through the official Kuddy consultation channel
            before the scheduled appointment time. We will review the submitted
            evidence to determine refund eligibility. In cases where the meeting
            is deemed impossible, the guide fee, including Kuddy fees, will be
            refunded in full, and the record of the companionship request will
            be deleted. 'Other issues' refer to the following cases:
            <ol>
              <li>- Death</li>
              <li>- Serious illness</li>
              <li>- Infectious disease</li>
              <li>- Natural disasters, etc.</li>
            </ol>
            <h3>4. Caution</h3> A guide user who unilaterally cancels an
            appointment may be subject to penalties, potentially resulting in a
            downgrade of their Kuddy user level.
          </div>
        </Box>
      </Modal>
    </BottomUpModal>
  );
}
