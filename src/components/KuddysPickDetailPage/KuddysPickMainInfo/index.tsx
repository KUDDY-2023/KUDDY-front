import "./kuddys-pick-main-info.scss";
import { useNavigate } from "react-router-dom";

const KuddysPickMainInfo = (
  {
    id,
    thumbnail,
    title,
    description,
  }: KuddysPickDetailType | KuddysPickPreviewType,
  isPreview: boolean | undefined,
) => {
  const nav = useNavigate();
  return (
    <div className="kuddyspickmaininfo-wrapper">
      <div className="kuddyspickmaininfo-thumbnail-rect">
        <img
          src={thumbnail}
          alt={title}
          onClick={isPreview ? () => nav(`/kuddys-pick/${id}`) : undefined}
        />
      </div>
      <div
        className="kuddyspickmaininfo-title"
        onClick={isPreview ? () => nav(`/kuddys-pick/${id}`) : undefined}
      >
        {title}
      </div>
      <div
        className="kuddyspickmaininfo-description"
        onClick={isPreview ? () => nav(`/kuddys-pick/${id}`) : undefined}
      >
        {description}
      </div>
    </div>
  );
};

export default KuddysPickMainInfo;
