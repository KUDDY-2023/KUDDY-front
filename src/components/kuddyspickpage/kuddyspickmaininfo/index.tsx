import "./kuddyspickmaininfo.scss";
import { KuddysPickDetailType } from "@components/kuddyspickdetailpage/kuddyspickdetailmenu/index";
import { KuddysPickPreviewType } from "@components/homepage/kuddyspickpreview";

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
