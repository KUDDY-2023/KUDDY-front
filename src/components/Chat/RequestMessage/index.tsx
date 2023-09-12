import "./request-message.scss";
import { ReactComponent as RightIcon } from "@assets/icon/arrow_right.svg";
import { ReactComponent as Paypal } from "@assets/pay/paypal.svg";
import { ReactComponent as YellowMeetUp } from "@assets/chat/yellow_meetup.svg";
import { useState } from "react";
interface Props {
  info: IGetMessage;
  statusType: "KUDDY_NOT_ACCEPT" | "TRAVELER_NOT_ACCEPT";
}

export default function RequestMessage({ info, statusType }: Props) {
  // 내가 커디면 false로, 여행자면 true로 하기
  //const [currentUser, setCurrentUser] = useState(false); // 여행자 vs 커디

  const _handlePlaceDetail = (placeId: number) => {
    console.log("장소 상세 페이지로 이동", placeId);
  };

  const _handleRequestPayPal = () => {
    console.log("페이팔 요청");
  };

  const _handleRefuseMessage = () => {
    console.log("거절");
  };

  return (
    <div className="confirmed-request-message-section">
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
              <div onClick={() => _handlePlaceDetail(info.spotContentId || 1)}>
                <p>{info.spotName}</p>
                <RightIcon id="right-icon" />
              </div>
              <div>
                <p>{info.appointmentTime}</p>
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
            <div>Not Confirmed</div>
          </div>
        )}

        {/* 여행자 유저가 기다림 */}
        {statusType === "TRAVELER_NOT_ACCEPT" && (
          <div className={`request-btn-container`}>
            <div id="refuse-btn" onClick={_handleRefuseMessage}>
              Refuse
            </div>
            <div id="accept-btn" onClick={_handleRequestPayPal}>
              Accept and Pay
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
