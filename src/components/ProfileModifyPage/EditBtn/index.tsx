import "./edit-btn.scss";
import modifyIcon from "@assets/profile/modify.svg";

const EditBtn = () => {
  return (
    <div className="profile-edit-btn">
      <img src={modifyIcon} />
      <p>edit</p>
    </div>
  );
};

export default EditBtn;
