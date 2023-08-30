import "./alarm-item.scss";

interface AlarmItemType {
  id: number;
  type: string;
  content: string;
  date: string;
  read: boolean;
}
interface Props {
  alarm: AlarmItemType;
}

export default function AlarmItem({ alarm }: Props) {
  const ReadClassName = alarm.read ? "read-alarm-item" : "unread-alarm-item";

  return (
    <div className={ReadClassName}>
      <p className="type">{alarm.type}</p>
      <p className="content">{alarm.content}</p>
      <p className="date">{alarm.date}</p>
    </div>
  );
}
