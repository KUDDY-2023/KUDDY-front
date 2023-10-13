import "./section3.scss";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { profileState, interestsArrState } from "@services/store/auth";
import BasicModifyForm from "../forms/BasicModifyForm";
import EditModal from "@components/ProfileModifyPage/EditModal";
import EditBtnModifyForm from "@components/ProfileModifyPage/forms/EditBtnModifyForm";
import { useUpdateProfile } from "@services/hooks/profile";
import useInterest from "@utils/hooks/useInterest";

const Section3 = () => {
  const [profile, setProfile] = useRecoilState(profileState); // 프로필 전역 상태
  const [form, setForm] = useState(""); // 오픈할 모달 형식
  const [isOpenModal, setIsOpenModal] = useState(false); // 편집 모달 오픈 여부
  const onUpdateProfile = useUpdateProfile();
  // 나라 & 지역 관련
  const [regionText, setRegionText] = useState(""); // 선택한 지역 텍스트로 표현
  // 언어 관련
  const languages = ["Beginner", "Intermediate", "Advanced", "Native Speaker"];
  const [languageText, setLanguageText] = useState(""); // 선택한 언어 텍스트로 표현
  // 관심사 관련
  const [interestsArr, setInterestsArr] = useRecoilState(interestsArrState); // interest 전역 상태 (값 읽기)
  const [interestText, setInterestText] = useState(""); // 선택한 interest 텍스트로 표현
  const { altElement } = useInterest();

  // region 관련
  useEffect(() => {
    let newRegionText = "";
    profile?.districts?.map((area, index) => {
      if (index > 0) newRegionText += ", ";
      newRegionText += area.areaName;
    });
    setRegionText(newRegionText);
  }, [profile?.districts]);

  // language 관련
  useEffect(() => {
    let newLanguageText = "";
    profile?.availableLanguages?.forEach((l: AvailableLanguageType) => {
      newLanguageText += `${l.languageType} - ${
        languages[Number(l.languageLevel) - 1]
      }\n`;
    });
    setLanguageText(newLanguageText);
  }, [profile?.availableLanguages]);

  // interest 관련
  useEffect(() => {
    let newValues = [];
    let newInterestText = "";

    for (let i = 0; i < interestsArr.length; i++) {
      const temp = interestsArr[i].interests
        .filter(interest => interest.selected)
        .map(interest => interest.inter);

      if (!!temp) {
        newValues.push(temp);
      }
    }

    for (let i = 0; i < newValues.length; i++) {
      newValues[i].forEach((v: any) => {
        v = altElement(v);
        v !== "" && (newInterestText += v + ", ");
      });
    }

    setInterestText(newInterestText.substring(0, newInterestText.length - 2));
  }, [interestsArr]);

  // edit 모달 관련
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const handleOpenModal = (editForm: string) => {
    setIsOpenModal(true);
    setForm(editForm);
  };

  return (
    <>
      <EditModal
        isModalOpen={isOpenModal}
        onClose={handleCloseModal}
        form={form}
      />
      <div className="detail-modify-container">
        {/* 지역/나라 */}
        {profile?.roleType === "KUDDY" ? (
          <EditBtnModifyForm
            subtitle="region"
            value={regionText}
            onClick={() => handleOpenModal("region")}
          />
        ) : (
          <BasicModifyForm text="nationality">
            <input
              type="text"
              className="profile-content"
              placeholder={profile?.nationality}
              value={profile?.nationality || ""}
              onChange={e => {
                onUpdateProfile({
                  nationality: e.target.value,
                });
              }}
            />
          </BasicModifyForm>
        )}
        {/* 언어 */}
        <EditBtnModifyForm
          subtitle="language"
          value={languageText}
          onClick={() => handleOpenModal("language")}
        />
        <div className="profile-line"></div>

        {/* 흥미 */}
        <EditBtnModifyForm
          subtitle="interest"
          value={interestText}
          onClick={() => handleOpenModal("interest")}
        />
      </div>
    </>
  );
};

export default Section3;
