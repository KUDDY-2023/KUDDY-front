import "./languageform.scss";
import { ReactComponent as DeleteIcon } from "@assets/icon/delete.svg";
import { ReactComponent as Plus } from "@assets/icon/plus.svg";
import { useEffect, useState } from "react";
import DropDown from "@components/_common/DropDown";
import useArrayState from "@utils/hooks/useArrayState";

import { useRecoilState } from "recoil";
import { profileState } from "@services/store/auth";
import { useUpdateProfile } from "@services/hooks/profile";

export default function LanguageForm() {
  const [profile, setProfile] = useRecoilState(profileState); // 전역상태
  const [languageLevelArr, { addItem, removeItem, updateItem }] =
    useArrayState<AvailableLanguageType>(profile.availableLanguages);

  const languages = [
    "English",
    "Korean",
    "Japanese",
    "Chinese",
    "Spanish",
    "French",
    "German",
    "Russian",
    "Portuguese",
    "Italian",
    "Vietnamese",
    "Thai",
    "Indonesian",
    "Hindi",
  ];
  const advances = ["Beginner", "Intermediate", "Advanced", "Native Speaker"];

  const _handleAddDropdowm = () => {
    let newItem = {
      languageType: "Language",
      languageLevel: "Level",
    };
    addItem(newItem);
  };

  const _handleDeleteDropdown = (id: number) => {
    removeItem(id);
  };

  const _handleSelectArr = (idx: number, type: string, item: string) => {
    let newItem =
      type === "Language"
        ? { ...languageLevelArr[idx], languageType: item }
        : { ...languageLevelArr[idx], languageLevel: item };

    updateItem(idx, newItem);
  };

  // 전역 상태 관리
  const onUpdateProfile = useUpdateProfile();

  useEffect(() => {
    onUpdateProfile({
      availableLanguages: languageLevelArr,
    });
  }, [languageLevelArr]);

  return (
    <div className="language-form-container">
      <p className="title">Choose your language proficiency</p>

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
              state={a.languageType}
              onSelect={_handleSelectArr}
              inActive={idx === 0}
            />
            <DropDown
              key={`lev-drop-${idx}`}
              items={advances}
              type="Level"
              placeholder="Level"
              id={idx}
              state={a.languageLevel}
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
