import "./languageform.scss";
import deleteIcon from "@assets/icon/delete.svg";
import plus from "@assets/icon/plus.svg";
import { useState } from "react";
import DropDown from "@components/_common/DropDown";
export default function LanguageForm() {
  const languages = ["English", "Korean"];
  const advances = ["1", "2", "3"];

  return (
    <div className="language-form-container">
      <p className="title">Write your avialable language</p>

      <div className="form-container">
        <p className="description">*At least one language must be selected</p>
        <div className="form-box">
          <DropDown items={languages} placeholder="English" />
          <DropDown items={advances} placeholder="advanced" />
        </div>
        <div className="form-box">
          <DropDown items={languages} placeholder="Korean" />
          <DropDown items={advances} placeholder="native" />
          <img src={deleteIcon} alt="delete" />
        </div>

        <div className="add-box">
          <img src={plus} alt="plus" />
          <p>Add</p>
        </div>
      </div>
    </div>
  );
}
