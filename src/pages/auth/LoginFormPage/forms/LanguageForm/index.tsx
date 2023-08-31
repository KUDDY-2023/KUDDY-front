import "./languageform.scss";
import { ReactComponent as DeleteIcon } from "@assets/icon/delete.svg";
import { ReactComponent as Plus } from "@assets/icon/plus.svg";
import { useEffect, useState } from "react";
import DropDown from "@components/_common/DropDown";
import useArrayState from "@utils/hooks/useArrayState";

type LanguageLevelType = {
  language: string;
  level: string;
};

export default function LanguageForm() {
  const languages = ["English", "Korean", "Djdsflsdkjf", "Isdf"];
  const advances = ["1", "2", "3"];

  const [languageLevelArr, { addItem, removeItem, updateItem }] =
    useArrayState<LanguageLevelType>([{ language: "English", level: "Level" }]);

  const _handleAddDropdowm = () => {
    let newItem = {
      language: "Language",
      level: "Level",
    };
    addItem(newItem);
  };

  const _handleDeleteDropdown = (id: number) => {
    removeItem(id);
  };

  const _handleSelectArr = (idx: number, type: string, item: string) => {
    if (type === "Language") {
      let newItem = { ...languageLevelArr[idx], language: item };
      updateItem(idx, newItem);
    } else {
      let newItem = { ...languageLevelArr[idx], level: item };
      updateItem(idx, newItem);
    }
  };

  return (
    <div className="language-form-container">
      <p className="title">Write your avialable language</p>

      <div className="form-container">
        <p className="description">*At least one language must be selected</p>

        {languageLevelArr.map((a, idx) => (
          <div className="form-box" key={`drop-${idx}`}>
            <DropDown
              key={`lan-drop-${idx}`}
              items={languages}
              type="Language"
              placeholder="Language"
              id={idx}
              state={a.language}
              onSelect={_handleSelectArr}
            />
            <DropDown
              key={`lev-drop-${idx}`}
              items={advances}
              type="Level"
              placeholder="Level"
              id={idx}
              state={a.level}
              onSelect={_handleSelectArr}
            />

            {idx !== 0 && (
              <DeleteIcon onClick={() => _handleDeleteDropdown(idx)} />
            )}
          </div>
        ))}

        <div className="add-box" onClick={_handleAddDropdowm}>
          <Plus />
          <p>Add</p>
        </div>
      </div>
    </div>
  );
}
