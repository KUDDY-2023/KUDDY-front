import "./maininfo.scss";

type MainInfoPropsType = {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  contents?: Array<object> | undefined;
};

const MainInfo = ({ id, thumbnail, title, description }: MainInfoPropsType) => {
  return (
    <div className="maininfo-wrapper">
      <div className="maininfo-thumbnail-rect">
        <img src={thumbnail} alt={title} />
      </div>
      <div className="maininfo-title">{title}</div>
      <div className="maininfo-description">{description}</div>
    </div>
  );
};

export default MainInfo;
