import "./language-form.scss";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { profileState } from "@services/store/auth";
import { useUpdateProfile } from "@services/hooks/profile";
import DropDown from "@components/_common/DropDown";
import redXIcon from "@assets/icon/red_x.svg";
import plusIcon from "@assets/icon/plus.svg";

type Props = {
  onClose: () => void;
};

const LanguageForm = ({ onClose }: Props) => {
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
  const levels = ["Beginner", "Intermediate", "Advanced", "Native Speaker"];
  const profile = useRecoilValue(profileState);
  const [selectedLanguage, setSelectedLanguage] = useState<
    AvailableLanguageType[]
  >(profile.availableLanguages);
  const onUpdateProfile = useUpdateProfile();

  // 언어 배열 초기화 (레벨을 숫자가 아닌 문자열로)
  useEffect(() => {
    const newLanguages = selectedLanguage?.map(language => {
      return {
        ...language,
        languageLevel: levels[Number(language.languageLevel) - 1],
      };
    });

    setSelectedLanguage(newLanguages);
  }, []);

  // 언어 선택
  const handleLanguageSelect = (idx: number, type: string, item: string) => {
    let newItem =
      type === "Language"
        ? { ...selectedLanguage[idx], languageType: item }
        : { ...selectedLanguage[idx], languageLevel: item };

    const newLanguages = selectedLanguage.map((language, index) =>
      index === idx ? newItem : language,
    );
    setSelectedLanguage(newLanguages);
  };

  // 언어 추가
  const handleAddDropdowm = () => {
    let newItem = {
      languageType: "Language",
      languageLevel: "Level",
    };
    setSelectedLanguage([...selectedLanguage, newItem]);
  };

  // 언어 삭제
  const handleXBtnClick = (languageId: number) => {
    const newLanguages = selectedLanguage.filter(
      (_, index) => index !== languageId,
    );
    setSelectedLanguage(newLanguages);
  };

  // 저장 버튼 클릭
  const handleSaveClick = () => {
    // 언어 레벨 다시 숫자로 변경
    const updatedLanguages = selectedLanguage?.map(language => {
      return {
        ...language,
        languageLevel: levels.indexOf(language.languageLevel).toString(),
      };
    });

    onUpdateProfile({ availableLanguages: updatedLanguages });

    onClose();
  };

  return (
    <div className="language-edit-container">
      <div className="language-form-text">
        *At least one language must be selected
      </div>
      <div className="language-list-container">
        {selectedLanguage.map((language, index) => {
          return (
            <div key={index} className="language-select-container">
              <DropDown
                items={languages}
                type="Language"
                placeholder="Language"
                id={index}
                state={language.languageType}
                onSelect={handleLanguageSelect}
              />
              <DropDown
                items={levels}
                type="Level"
                placeholder="Level"
                id={index}
                state={language.languageLevel}
                onSelect={handleLanguageSelect}
              />
              {index > 0 && (
                <img src={redXIcon} onClick={() => handleXBtnClick(index)} />
              )}
            </div>
          );
        })}
        <div className="language-add-btn" onClick={handleAddDropdowm}>
          <img src={plusIcon} />
          Add
        </div>
      </div>
      <div className="save-btn" onClick={handleSaveClick}>
        Save
      </div>
    </div>
  );
};

export default LanguageForm;
