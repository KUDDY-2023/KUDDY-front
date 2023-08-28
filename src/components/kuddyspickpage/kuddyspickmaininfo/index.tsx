import "./kuddys-pick-main-info.scss";
import { KuddysPickDetailType } from "@components/KuddysPickDetailPage/index";
import { KuddysPickPreviewType } from "@components/HomePage/KuddysPickPreview";

const KuddysPickMainInfo = ({
  thumbnail,
  title,
  description,
}: KuddysPickDetailType | KuddysPickPreviewType) => {
  return (
    <div className="kuddyspickmaininfo-wrapper">
      <div className="kuddyspickmaininfo-thumbnail-rect">
        <img src={thumbnail} alt={title} />
      </div>
      <div className="kuddyspickmaininfo-title">{title}</div>
      <div className="kuddyspickmaininfo-description">{description}</div>
    </div>
  );
};

export default KuddysPickMainInfo;
