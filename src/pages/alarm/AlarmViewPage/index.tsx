import "./alarm-view-page.scss";
import BackNavBar from "@components/_common/BackNavBar";
import AlarmItem from "@components/Alarm/AlarmItem";
import { alarmData } from "./alarmData";
export default function AlarmViewPage() {
  return (
    <div className="alarm-view-page">
      <BackNavBar middleTitle="Notification" isShare={false} />

      <div className="alarm-item-container">
        {alarmData.map(a => (
          <AlarmItem alarm={a} key={a.id} />
        ))}
      </div>
    </div>
  );
}
