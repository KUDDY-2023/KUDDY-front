import "./edit-btn.scss";
import modifyIcon from "@assets/profile/modify.svg";

type PropType = {
  onClick: () => void;
};

const EditBtn = ({ onClick }: PropType) => {
  return (
    <div className="profile-edit-btn" onClick={onClick}>
      <img src={modifyIcon} />
      <p>edit</p>
    </div>
  );
};

export default EditBtn;
