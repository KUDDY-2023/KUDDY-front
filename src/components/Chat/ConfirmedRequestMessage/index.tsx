import "./confirmed-request-message.scss";
import { ReactComponent as RightIcon } from "@assets/icon/arrow_right.svg";
import { ReactComponent as Paypal } from "@assets/pay/paypal.svg";
import { ReactComponent as YellowMeetUp } from "@assets/chat/yellow_meetup.svg";
import { ReactComponent as RedwMeetUp } from "@assets/chat/red_meetup.svg";
import { ReactComponent as BlueMeetUp } from "@assets/chat/blue_meetup.svg";
import SystemMessage from "../SystemMessage";
import { useState } from "react";

interface Props {
  info: IGetMessage;
  statusType: "PAYED" | "TRAVELER_CANCEL" | "COMPLETED" | "KUDDY_CANCEL";
}

export default function ConfirmedRequestMessage({ info, statusType }: Props) {
  const statusTypeMap = {
    PAYED: 1,
    TRAVELER_CANCEL: 2,
    COMPLETED: 3,
    KUDDY_CANCEL: 4,
  };

  const typeNum = statusTypeMap[statusType] - 1;

  const meetStatus = ["Accepted", "Refused", "Done", "Cancelled"];

  // KUDDY_CANCEL  버전 하나 추가해야함
  const MeetUpIcon = [YellowMeetUp, RedwMeetUp, BlueMeetUp, RedwMeetUp][
    typeNum
  ];
  // KUDDY_CANCEL  버전 하나 추가해야함

  const statusStyle = [
    "active-meetup",
    "inactive-meetup",
    "inactive-meetup",
    "inactive-meetup",
  ];

  // KUDDY_CANCEL  버전 하나 추가해야함

  const btnTextStyle = ["black-text", "red-text", "blue-text", "red-text"];

  const _handlePlaceDetail = (placeId: number) => {
    console.log("장소 상세 페이지로 이동", placeId);
  };

  return (
    <div className="confirmed-request-message-section">
      <div className="confirmed-request-message">
        <MeetUpIcon id="meetup-icon" />

        <div className={`request-partner-section ${statusStyle[typeNum]}`}>
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
              <div onClick={() => _handlePlaceDetail(info.spotContentId || 0)}>
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
          <div className={`request-btn ${btnTextStyle[typeNum]}`}>
            {meetStatus[typeNum]}
          </div>
        </div>
      </div>

      <SystemMessage type={typeNum} />
    </div>
  );
}
