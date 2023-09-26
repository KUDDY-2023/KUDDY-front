import "./request-message.scss";
import { ReactComponent as RightIcon } from "@assets/icon/arrow_right.svg";
import { ReactComponent as Paypal } from "@assets/pay/paypal.svg";
import { ReactComponent as YellowMeetUp } from "@assets/chat/yellow_meetup.svg";
import { ReactComponent as Cancle } from "@assets/chat/bt_delete.svg";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 채팅
import { MutableRefObject } from "react";
import { CompatClient } from "@stomp/stompjs";
import { useSaveMessage } from "@services/hooks/chat";
import { useFormatDate } from "@utils/hooks/useformatDate";

// 페이팔 모달
import PayPal from "@components/Paypal";

interface Props {
  client: MutableRefObject<CompatClient | undefined>;
  info: IGetMessage;
  myEmail: string;
  statusType: "KUDDY_NOT_ACCEPT" | "TRAVELER_NOT_ACCEPT";
}

export default function RequestMessage({
  client,
  info,
  myEmail,
  statusType,
}: Props) {
  const navigate = useNavigate();
  const onSave = useSaveMessage();

  const onPlaceDetail = (placeId: number) => {
    navigate(`/travel/${placeId}`);
  };

  const onPayPal = () => {
    console.log("⭐ 페이팔 요청");
    handleOpen(); // 페이팔 모달 열기
  };

  const onRefuse = () => {
    console.log("여행객이 거부함");
    onUpdateMessage("TRAVELER_CANCEL");
  };

  const onCancel = () => {
    console.log("커디가 취소함");
    onUpdateMessage("KUDDY_CANCEL");
  };

  const token = localStorage.getItem("accessToken");

  let formatedAppointmentTime = useFormatDate(info.appointmentTime || "");
  let spotName = info.spotName || "";
  spotName = spotName.length > 22 ? spotName.slice(0, 22) + "..." : spotName;

  const onUpdateMessage = async (newStatus: string) => {
    if (client.current) {
      console.log("info", info);

      let updateMsg = {
        ...info,
        meetStatus: newStatus,
        isUpdated: 1,
        senderEmail: myEmail,
      };

      console.log("업데이트 시도 내용", updateMsg);

      try {
        // ✅ 메세지 상태 업데이트하기
        client.current.send(
          "/app/updateMessage",
          { Authorization: `Bearer ${token}` },
          JSON.stringify(updateMsg),
        );
      } catch (e) {
        alert(e);
      } finally {
        // setIsMapOpen(false);
      }
    }
  };

  // 페이팔 모달 상태
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="confirmed-request-message-section">
      <PayPal
        open={open}
        handleClose={handleClose}
        onUpdateMessage={onUpdateMessage}
        info={info}
      />
      <div className="confirmed-request-message">
        <YellowMeetUp id="meetup-icon" />

        <div className="request-partner-section">
          {/* 상대방 이름으로 바꿔야하나? */}
          <p>Meet up with {info.senderName}!</p>
        </div>
        <div className="request-info-section">
          <div className="info-grid">
            <div className="grid-left">
              <p>Place</p>
              <p>Date</p>
              <p>Pay</p>
            </div>
            <div className="grid-right">
              <div onClick={() => onPlaceDetail(info.spotContentId || 0)}>
                <p id="korean">{spotName}</p>
                <RightIcon id="right-icon" />
              </div>
              <div>
                <p>{formatedAppointmentTime}</p>
              </div>
              <div>
                <p>{info.price}$</p>
                <Paypal />
              </div>
            </div>
          </div>
        </div>

        {/* 커디 유저가 기다리고 있음 */}
        {statusType === "KUDDY_NOT_ACCEPT" && (
          <div className={`not-confirmed-btn-container`}>
            <div>Waiting for a response</div>
          </div>
        )}

        {/* 여행자 유저가 기다림 */}
        {statusType === "TRAVELER_NOT_ACCEPT" && (
          <div className={`request-btn-container`}>
            <div id="refuse-btn" onClick={onRefuse}>
              Refuse
            </div>
            <div id="accept-btn" onClick={onPayPal}>
              Accept and Pay
            </div>
          </div>
        )}
      </div>

      {statusType === "KUDDY_NOT_ACCEPT" && (
        <div className="cancel-transfer" onClick={onCancel}>
          <Cancle />
          Cancel Transaction
        </div>
      )}
    </div>
  );
}
