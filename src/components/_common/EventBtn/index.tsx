import "./eventbtn.scss";

interface Props {
  btnName: string;
  isActive: boolean;
  onClick: any;
}

export default function EventBtn({ btnName, isActive, onClick }: Props) {
  const handleClick = () => {
    if (isActive) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="custom-event-btn-style"
      id={isActive ? "custom-event-btn-active" : ""}
    >
      {btnName}
    </button>
  );
}
