import "./request-message.scss";
import { ReactComponent as RightIcon } from "@assets/icon/arrow_right.svg";
import { ReactComponent as Paypal } from "@assets/pay/paypal.svg";
import { ReactComponent as YellowMeetUp } from "@assets/icon/chat/yellow_meetup.svg";
import { useState } from "react";
interface Props {
  info: MeetUpInfoType;
}

export default function RequestMessage({ info }: Props) {
  const [currentUser, setCurrentUser] = useState(true); // 여행자 vs 커디
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
          <p>Meet up with {info.partnerName}!</p>
        </div>
        <div className="request-info-section">
          <div className="info-grid">
            <div className="grid-left">
              <p>Place</p>
              <p>Date</p>
              <p>Pay</p>
            </div>
            <div className="grid-right">
              <div onClick={() => _handlePlaceDetail(info.placeId)}>
                <p>{info.place}</p>
                <RightIcon id="right-icon" />
              </div>
              <div>
                <p>{info.date}</p>
              </div>
              <div>
                <p>{info.pay}$</p>
                <Paypal />
              </div>
            </div>
          </div>
        </div>

        {currentUser ? (
          <div className={`request-btn-container`}>
            <div id="refuse-btn" onClick={_handleRefuseMessage}>
              Refuse
            </div>
            <div id="accept-btn" onClick={_handleRequestPayPal}>
              Accept and Pay
            </div>
          </div>
        ) : (
          <div className={`not-confirmed-btn-container`}>
            <div>Not Confirmed</div>
          </div>
        )}
      </div>
    </div>
  );
}
