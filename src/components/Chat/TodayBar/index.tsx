import "./todaybar.scss";

type Props = {
  date?: string;
};
export default function TodayBar({ date }: Props) {
  return (
    <div className="today-bar-style">
      <hr />
      <p>{date ? date : "today"}</p>
      <hr />
    </div>
  );
}
