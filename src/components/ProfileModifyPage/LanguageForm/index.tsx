import "./language-form.scss";
import DropDown from "@components/_common/DropDown";
import redXIcon from "@assets/icon/red_x.svg";
import plusIcon from "@assets/icon/plus.svg";

const LanguageForm = () => {
  const languages = ["Korean", "English", "Spanish"];
  const levels = ["Advanced", "Native speaker"];

  const handleLanguageSelect = () => {
    console.log("언어 선택");
  };

  return (
    <div className="language-edit-container">
      <div className="language-form-text">
        *At least one language must be selected
      </div>
      <div className="language-list-container">
        <div className="language-select-container">
          <DropDown
            items={languages}
            type="Language"
            placeholder="Language"
            id={1}
            state="English"
            onSelect={handleLanguageSelect}
          />
          <DropDown
            items={levels}
            type="Level"
            placeholder="Level"
            id={2}
            state="Advanced"
            onSelect={handleLanguageSelect}
          />
        </div>
        <div className="language-select-container">
          <DropDown
            items={languages}
            type="Language"
            placeholder="Language"
            id={1}
            state="Korean"
            onSelect={handleLanguageSelect}
          />
          <DropDown
            items={levels}
            type="Level"
            placeholder="Level"
            id={2}
            state="Native speaker"
            onSelect={handleLanguageSelect}
          />
          <img src={redXIcon} />
        </div>
        <div className="language-add-btn">
          <img src={plusIcon} />
          Add
        </div>
      </div>
    </div>
  );
};

export default LanguageForm;
