import "./profile-modify-page.scss";
import { useState, useEffect } from "react";
import photoBtn from "@assets/profile/photo.svg";
import DropDown from "@components/_common/DropDown";
import EditModal from "@components/ProfileModifyPage/EditModal";
import BasicModifyForm from "@components/ProfileModifyPage/BasicModifyForm";
import EditBtnModifyForm from "@components/ProfileModifyPage/EditBtnModifyForm";
import { useGetProfile, usePutProfileModify } from "@services/hooks/profile";
import { useNavigate } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import { profileState, interestsArrState } from "@services/store/auth";
import { profileIntroduce } from "@services/store/profile";

const ProfileModifyPage = () => {
  const nav = useNavigate();
  const genders = ["Male", "Female", "Prefer not to say"];
  const languages = ["Beginner", "Intermediate", "Advanced", "Native Speaker"];
  const nations = ["Spanish", "US", "Germany"];
  const interestType = [
    "artBeauty",
    "activitiesInvestmentTech",
    "careerMajor",
    "entertainment",
    "food",
    "hobbiesInterests",
    "lifestyle",
    "sports",
    "wellbeing",
  ];

  const [profile, setProfile] = useRecoilState(profileState); // 프로필 전역 상태
  const [introduce, setIntroduce] = useRecoilState(profileIntroduce); // 프로필 introduce 전역 상태
  const [interestsArr, setInterestsArr] = useRecoilState(interestsArrState); // interest 전역 상태 (값 읽기)

  const [gender, setGender] = useState(""); // 선택한 성별 텍스트
  const [regionText, setRegionText] = useState(""); // 선택한 지역 텍스트로 표현
  const [languageText, setLanguageText] = useState(""); // 선택한 언어 텍스트로 표현
  const [interestText, setInterestText] = useState(""); // 선택한 interest 텍스트로 표현
  const [isOpenModal, setIsOpenModal] = useState(false); // 편집 모달 오픈 여부
  const [form, setForm] = useState(""); // 오픈할 모달 형식
  const { data, isLoading, error } = useGetProfile();
  const onProfileModify = usePutProfileModify();

  // 내 프로필 정보 가져오기
  useEffect(() => {
    if (data) {
      console.log("####" + JSON.stringify(data.data.data));
      const myProfile = data.data.data;
      console.log("$$$" + JSON.stringify(myProfile?.interests));

      // 프로필 저장
      setProfile({
        roleType: myProfile.role,
        nickname: myProfile.memberInfo.nickname,
        profileImageUrl: myProfile.memberInfo.profileImageUrl,
        genderType: myProfile.gender,
        birthDate: myProfile.birthDate,
        temperament: myProfile.temperament.toUpperCase(),
        decisionMaking: myProfile.decisionMaking.toUpperCase(),
        job: myProfile.job,
        nationality: myProfile.nationality,
        availableLanguages: myProfile.languages,
        districts: myProfile.areas,
      });
      // 소개글 저장
      setIntroduce(myProfile?.introduce);
      // interest 저장
    }
  }, [isLoading]);

  // ✨지우기
  useEffect(() => {
    console.log(JSON.stringify(profile));
  }, [profile]);
  // ✨

  // 프로필 이미지 관련
  const handlePhotoBtnClick = () => {
    console.log("프로필 이미지 편집");
  };

  // gender 관련
  useEffect(() => {
    let genderTemp = "";
    switch (profile?.genderType) {
      case "MR":
        genderTemp = "Male";
        break;
      case "MS":
        genderTemp = "Female";
        break;
      case "N":
        genderTemp = "Prefer not to say";
    }
    setGender(genderTemp);
  }, [profile?.genderType]);

  const handleSelectGender = (id: number, type: string, selected: string) => {
    let newGender: GenderType = profile.genderType;
    switch (selected) {
      case "Male":
        newGender = "MR";
        break;
      case "Female":
        newGender = "MS";
        break;
      case "Prefer not to say":
        newGender = "N";
    }
    setProfile({ ...profile, genderType: newGender });
  };

  // region 관련
  useEffect(() => {
    let newRegionText = "";
    profile?.districts?.map((area, index) => {
      if (index > 0) newRegionText += ", ";
      newRegionText += area.areaName;
    });
    setRegionText(newRegionText);
  }, [profile?.districts]);

  // nation 관련
  const handleSelectNation = (id: number, type: string, selected: string) => {
    setProfile({ ...profile, nationality: selected });
  };

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
        v = v.toLowerCase();
        v = v.replace(/^[a-z]/, (char: any) => char.toUpperCase());
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

  // complete 버튼 클릭
  const handleCompleteClick = async () => {
    const res = await onProfileModify();
    console.log(res);
    nav(`/profile/${profile.nickname}`);
  };

  return (
    <div className="profile-modify-page-container">
      <div className="profile-nav-bar">
        <p onClick={() => nav(-1)}>Cancel</p>
        <p id="blue-text" onClick={handleCompleteClick}>
          Complete
        </p>
      </div>

      <EditModal
        isModalOpen={isOpenModal}
        onClose={handleCloseModal}
        form={form}
      />

      {/* 프로필 사진 */}
      <div className="profile-image-container">
        <img src={profile?.profileImageUrl} className="profile-image" />
        <img
          src={photoBtn}
          className="photo-btn"
          onClick={handlePhotoBtnClick}
        />
      </div>

      {/* 이름 */}
      <div className="detail-modify-container">
        <BasicModifyForm text="name">
          <input
            type="text"
            className="profile-content"
            placeholder={profile?.nickname}
            value={profile?.nickname || ""}
            onChange={e =>
              setProfile((p: any) => ({ ...p, nickname: e.target.value }))
            }
          />
        </BasicModifyForm>

        {/* 소개글 */}
        <BasicModifyForm text="introduce">
          <textarea
            className="profile-content"
            placeholder={introduce}
            value={introduce || ""}
            onChange={e => setIntroduce(e.target.value)}
          />
        </BasicModifyForm>
        <div className="profile-line"></div>

        {/* 성별 */}
        <BasicModifyForm text="gender">
          <DropDown
            items={genders}
            type="Gender"
            placeholder="Gender"
            id={1}
            state={gender}
            onSelect={handleSelectGender}
          />
        </BasicModifyForm>
        {/* 생일 추가 */}
        <BasicModifyForm text="birth">
          <div>생일</div>
        </BasicModifyForm>
        {/* 직업 */}
        <BasicModifyForm text="job">
          <input
            type="text"
            className="profile-content"
            placeholder={profile?.job}
            value={profile?.job || ""}
            onChange={e =>
              setProfile((p: any) => ({ ...p, job: e.target.value }))
            }
          />
        </BasicModifyForm>
        {/* 성격 */}
        <div className="detail-modify-inner-container">
          <div className="profile-subtitle">personality</div>
          <div className="vertical-container"></div>
        </div>

        {/* 지역/나라 */}
        {profile?.roleType === "KUDDY" ? (
          <EditBtnModifyForm
            subtitle="region"
            value={regionText}
            onClick={() => handleOpenModal("region")}
          />
        ) : (
          <div className="detail-modify-inner-container">
            <div className="profile-subtitle">nationality</div>
            <DropDown
              items={nations}
              type="Nationality"
              placeholder="Nationality"
              id={1}
              state={profile?.nationality || ""}
              onSelect={handleSelectNation}
            />
          </div>
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
    </div>
  );
};

export default ProfileModifyPage;
