import "./eventbtn.scss";

interface Props {
  btnName: string;
  isActive: boolean;
  onClick: () => void;
}

export default function EventBtn({ btnName, isActive, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="custom-event-btn-style"
      id={isActive ? "custom-event-btn-active" : ""}
    >
      {btnName}
    </button>
  );
}
