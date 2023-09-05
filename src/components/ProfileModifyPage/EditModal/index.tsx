import "./edit-modal.scss";
import BottomUpModal from "@components/_common/BottomUpModal";
import InterestForm from "@components/ProfileModifyPage/InterestForm";
import LanguageForm from "@components/ProfileModifyPage/LanguageForm";
import RegionForm from "@components/ProfileModifyPage/RegionForm";

interface Props {
  isModalOpen: boolean;
  onClose: () => void;
  form: string;
}

const EditModal = ({ isModalOpen, onClose, form }: Props) => {
  let title, EditForm;
  switch (form) {
    case "region":
      title = "Region";
      EditForm = <RegionForm />;
      break;
    case "language":
      title = "Language";
      EditForm = <LanguageForm />;
      break;
    case "interest":
      title = "Interest";
      EditForm = <InterestForm />;
  }

  const handleSaveClick = () => {
    console.log("저장");
  };

  return (
    <BottomUpModal
      isModalOpen={isModalOpen}
      onClose={onClose}
      navbarHeight={56}
      whiteBackground={true}
    >
      <div className="edit-title">{title}</div>
      <div className="edit-form-container">
        {EditForm}
        <div className="save-btn">Save</div>
      </div>
    </BottomUpModal>
  );
};

export default EditModal;
