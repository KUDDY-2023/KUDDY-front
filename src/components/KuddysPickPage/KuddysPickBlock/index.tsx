import "./kuddys-pick-block.scss";
import { KuddysPickType } from "@pages/kuddyspick/KuddysPickPage";
import { useNavigate } from "react-router-dom";

const KuddysPickBlock = ({ id, thumbnail, title }: KuddysPickType) => {
  const nav = useNavigate();
  return (
    <div
      onClick={() => nav(`/kuddys-pick/${id}`)}
      style={{ position: "relative" }}
    >
      <div className="kuddyspickblock-img-rect">
        <img src={thumbnail} />
        <div className="kuddyspickblock-img-gradient"></div>
      </div>
      <div className="kuddyspickblock-text-container">
        <div className="kuddyspickblock-text">{title}</div>
      </div>
    </div>
  );
};

export default KuddysPickBlock;
