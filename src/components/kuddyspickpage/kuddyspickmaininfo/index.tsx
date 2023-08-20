import "./kuddyspickmaininfo.scss";

type MainInfoPropsType = {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  contents?: Array<object> | undefined;
};

const KuddysPickMainInfo = ({
  id,
  thumbnail,
  title,
  description,
}: MainInfoPropsType) => {
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
