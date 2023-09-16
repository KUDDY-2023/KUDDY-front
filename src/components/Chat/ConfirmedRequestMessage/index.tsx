import "./confirmed-request-message.scss";
import { ReactComponent as RightIcon } from "@assets/icon/arrow_right.svg";
import { ReactComponent as Paypal } from "@assets/pay/paypal.svg";
import { ReactComponent as YellowMeetUp } from "@assets/chat/yellow_meetup.svg";
import { ReactComponent as RedwMeetUp } from "@assets/chat/red_meetup.svg";
import { ReactComponent as BlueMeetUp } from "@assets/chat/blue_meetup.svg";
import SystemMessage from "../SystemMessage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFormatDate } from "@utils/hooks/useformatDate";

interface Props {
  info: IGetMessage;
  statusType: "PAYED" | "TRAVELER_CANCEL" | "COMPLETED" | "KUDDY_CANCEL";
}

export default function ConfirmedRequestMessage({ info, statusType }: Props) {
  const navigate = useNavigate();

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

  const onPlaceDetail = (placeId: number) => {
    navigate(`/travel/${placeId}`);
  };

  let formatedAppointmentTime = useFormatDate(info.appointmentTime || "");
  let spotName = info.spotName || "";
  spotName = spotName.length > 22 ? spotName.slice(0, 22) + "..." : spotName;

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
              <div onClick={() => onPlaceDetail(info.spotContentId || 0)}>
                <p id="place-text">{spotName}</p>
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
          <div className={`request-btn ${btnTextStyle[typeNum]}`}>
            {meetStatus[typeNum]}
          </div>
        </div>
      </div>

      <SystemMessage type={typeNum} />
    </div>
  );
}
