import "./backnavbar.scss";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackIcon } from "@assets/icon/back.svg";

interface Props {
  middleTitle: string;
}

export default function BackNavBar({ middleTitle }: Props) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="backnavbar-container">
      <BackIcon onClick={goBack} />
      <p>{middleTitle}</p>
    </div>
  );
}
