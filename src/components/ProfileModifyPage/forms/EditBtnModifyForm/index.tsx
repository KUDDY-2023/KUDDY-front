import "./edit-btn-modify-form.scss";
import EditBtn from "@components/ProfileModifyPage/EditBtn";

type Props = {
  subtitle: string;
  value: string;
  onClick: () => void;
};

// edit 버튼 있는(region, language, interest) 형식
const EditBtnModifyForm = ({ subtitle, value, onClick }: Props) => {
  return (
    <div className="edit-btn-form-container">
      <div className="profile-subtitle">{subtitle}</div>
      <div className="vertical-container">
        <div className="profile-content grey">{value}</div>
        <EditBtn onClick={onClick} />
      </div>
    </div>
  );
};

export default EditBtnModifyForm;
