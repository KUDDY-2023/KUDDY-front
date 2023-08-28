import "./confirmed-request-message.scss";
import { ReactComponent as RightIcon } from "@assets/icon/arrow_right.svg";
import { ReactComponent as Paypal } from "@assets/pay/paypal.svg";
import { ReactComponent as YellowMeetUp } from "@assets/chat/yellow_meetup.svg";
import { ReactComponent as RedwMeetUp } from "@assets/chat/red_meetup.svg";
import { ReactComponent as BlueMeetUp } from "@assets/chat/blue_meetup.svg";
import SystemMessage from "../SystemMessage";
import { useState } from "react";

interface Props {
  info: ConfirmedMeetUpInfoType;
}

export default function ConfirmedRequestMessage({ info }: Props) {
  const meetStatus = ["Accepted", "Refused", "Done"];
  const MeetUpIcon = [YellowMeetUp, RedwMeetUp, BlueMeetUp][
    info.meetStatus - 1
  ];
  const statusStyle = ["active-meetup", "inactive-meetup", "inactive-meetup"];
  const btnTextStyle = ["black-text", "red-text", "blue-text"];

  const _handlePlaceDetail = (placeId: number) => {
    console.log("장소 상세 페이지로 이동", placeId);
  };

  return (
    <div className="confirmed-request-message-section">
      <div className="confirmed-request-message">
        <MeetUpIcon id="meetup-icon" />

        <div
          className={`request-partner-section ${
            statusStyle[info.meetStatus - 1]
          }`}
        >
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
          <div className={`request-btn ${btnTextStyle[info.meetStatus - 1]}`}>
            {meetStatus[info.meetStatus - 1]}
          </div>
        </div>
      </div>
      <SystemMessage type="accept" />
    </div>
  );
}
