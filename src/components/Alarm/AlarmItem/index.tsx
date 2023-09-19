import "./alarm-item.scss";

interface AlarmItemType {
  id: number;
  contentId: number;
  content: string;
  isRead: boolean;
  notificationType: "COMMENT" | "REPLY";
  time: string;
}

interface Props {
  alarm: AlarmItemType;
  onGotoPost: () => void;
}

export default function AlarmItem({ alarm, onGotoPost }: Props) {
  const ReadClassName = alarm.isRead ? "read-alarm-item" : "unread-alarm-item";

  let type =
    alarm.notificationType === "COMMENT"
      ? "New comment on my post"
      : "New reply to my comment";

  let comment =
    alarm.content.length > 50
      ? alarm.content.substring(0, 50) + "..."
      : alarm.content;

  let time = formatDateTime(alarm.time);
  return (
    <div className={ReadClassName} onClick={onGotoPost}>
      <p className="type">{type}</p>
      <p className="content">{comment}</p>
      <p className="date">{time}</p>
    </div>
  );
}

function formatDateTime(inputDateTime: string) {
  const dateObj = new Date(inputDateTime);

  // 날짜 형식 변환 (예: 2099.99.99)
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}.${month}.${day}`;

  // 시간 형식 변환 (예: 11:55)
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;

  // 최종 형식으로 조합
  const formattedDateTime = `${formattedDate} ${formattedTime}`;
  return formattedDateTime;
}
