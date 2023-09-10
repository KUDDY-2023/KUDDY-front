import "./alarm-view-page.scss";
import BackNavBar from "@components/_common/BackNavBar";
import AlarmItem from "@components/Alarm/AlarmItem";
import { alarmData } from "./alarmData";

import { useState } from "react";

export default function AlarmViewPage() {
  const [canMark, setCanMark] = useState(true);
  return (
    <div className="alarm-view-page">
      <BackNavBar middleTitle="Notification" isShare={false} />
      <div className="top-container">
        <div className="count-box">
          <span>4</span> new notification
        </div>
        <div className={`mark-btn ${canMark && "active"}`}>
          Mark all as read
        </div>
      </div>
      <div className="alarm-item-container">
        {alarmData.map(a => (
          <AlarmItem alarm={a} key={a.id} />
        ))}
      </div>
    </div>
  );
}
