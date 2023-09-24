import "./profile-modify-page.scss";
import { ReactNode, useState, useEffect } from "react";
import photoBtn from "@assets/profile/photo.svg";
import DropDown from "@components/_common/DropDown";
import EditBtn from "@components/ProfileModifyPage/EditBtn";
import EditModal from "@components/ProfileModifyPage/EditModal";
import { useGetProfile } from "@services/hooks/profile";
import { useNavigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { profileState } from "@services/store/auth";

type EditItemProps = {
  subtitle: string;
  value: string;
  onClick: () => void;
};

type ModifyItemProps = {
  text: string;
  children: ReactNode;
};

// 일반 형식
const ModifyItem = ({ text, children }: ModifyItemProps) => {
  return (
    <div className="detail-modify-inner-container">
      <div className="profile-subtitle">{text}</div>
      {children}
    </div>
  );
};

// edit 버튼 있는(region, language, interest) 형식
const EditItem = ({ subtitle, value, onClick }: EditItemProps) => {
  return (
    <div className="detail-modify-inner-container">
      <div className="profile-subtitle">{subtitle}</div>
      <div className="vertical-container">
        <div className="profile-content grey">{value}</div>
        <EditBtn onClick={onClick} />
      </div>
    </div>
  );
};

const ProfileModifyPage = () => {
  const nav = useNavigate();
  const interestKey = [
    "wellbeing",
    "activitiesInvestmentTech",
    "careerMajor",
    "entertainment",
    "hobbiesInterests",
    "lifestyle",
    "artBeauty",
    "food",
    "sports",
  ];
  const genders = ["Mr", "Ms", "Neutral"];
  const nations = ["Spanish", "US", "Germany"];
  const [profile, setProfile] = useState<any>();
  const [languageText, setLanguageText] = useState("");
  const [interestText, setInterestText] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form, setForm] = useState("");

  const myProfile = useRecoilValue(profileState);
  useEffect(() => {
    console.log(JSON.stringify(myProfile));
  }, []);

  // 내 프로필 정보 가져오기
  const { data, isLoading, error } = useGetProfile();

  useEffect(() => {
    if (data) {
      setProfile(data.data.data);
    }
  }, [isLoading]);

  // 프로필 이미지 관련
  const handlePhotoBtnClick = () => {
    console.log("프로필 이미지 편집");
  };

  // gender 관련
  const handleSelectGender = (id: number, type: string, selected: string) => {
    let newGender: GenderType = profile.gender;
    switch (selected) {
      case "Mr":
        newGender = "MR";
        break;
      case "Ms":
        newGender = "MS";
        break;
      case "Neutral":
        newGender = "N";
    }
    setProfile({ ...profile, gender: newGender });
    console.log(profile);
  };

  // nation 관련
  const handleSelectNation = (id: number, type: string, selected: string) => {
    setProfile({ ...profile, nationality: selected });
  };

  // language 관련
  useEffect(() => {
    let newLanguageText = "";
    profile?.languages?.forEach((l: AvailableLanguageType) => {
      newLanguageText += `${l.languageType} - ${l.languageLevel}\n`;
    });
    setLanguageText(newLanguageText);
  }, [profile?.languages]);

  // interest 관련
  useEffect(() => {
    let newValues = [];
    let newInterestText = "";

    if (!!profile) {
      console.log(profile.interests);
      for (let i = 0; i < interestKey.length; i++) {
        const temp = profile?.interests[interestKey[i]]?.filter(
          (v: any) => v !== "NOT_SELECTED",
        );

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
    }
  }, [profile]);

  // edit 모달 관련
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const handleOpenModal = (editForm: string) => {
    setIsOpenModal(true);
    setForm(editForm);
  };

  return (
    <div className="profile-modify-page-container">
      <div className="profile-nav-bar">
        <p onClick={() => nav(-1)}>Cancel</p>
        <p id="blue-text">Complete</p>
      </div>

      <EditModal
        isModalOpen={isOpenModal}
        onClose={handleCloseModal}
        form={form}
        profile={profile}
      />

      {/* 프로필 사진 */}
      <div className="profile-image-container">
        <img
          src={profile?.memberInfo?.profileImageUrl}
          className="profile-image"
        />
        <img
          src={photoBtn}
          className="photo-btn"
          onClick={handlePhotoBtnClick}
        />
      </div>

      {/* 이름 */}
      <div className="detail-modify-container">
        <ModifyItem text="name">
          <input
            type="text"
            className="profile-content"
            placeholder={profile?.memberInfo?.nickname}
            value={profile?.memberInfo?.nickname || ""}
            onChange={e =>
              setProfile((p: any) => ({ ...p, nickname: e.target.value }))
            }
          />
        </ModifyItem>

        {/* 소개글 */}
        <ModifyItem text="introduce">
          <textarea
            className="profile-content"
            placeholder={profile?.introduce}
            value={profile?.introduce || ""}
            onChange={e =>
              setProfile((p: any) => ({ ...p, introduce: e.target.value }))
            }
          />
        </ModifyItem>
        <div className="profile-line"></div>

        {/* 성별 */}
        <ModifyItem text="gender">
          <DropDown
            items={genders}
            type="Gender"
            placeholder="Gender"
            id={1}
            state={profile?.gender}
            onSelect={handleSelectGender}
          />
        </ModifyItem>
        {/* 나이 */}
        <ModifyItem text="age">
          <input
            type="text"
            className="profile-content"
            placeholder={String(profile?.age)}
            value={profile?.age || ""}
            onChange={e =>
              setProfile((p: any) => ({
                ...p,
                age: Number(e.target.value.replace(/[^0-9]/g, "")),
              }))
            }
          />
        </ModifyItem>
        {/* 직업 */}
        <ModifyItem text="job">
          <input
            type="text"
            className="profile-content"
            placeholder={profile?.job}
            value={profile?.job || ""}
            onChange={e =>
              setProfile((p: any) => ({ ...p, job: e.target.value }))
            }
          />
        </ModifyItem>
        {/* 성격 */}
        <div className="detail-modify-inner-container">
          <div className="profile-subtitle">personality</div>
          <div className="vertical-container"></div>
        </div>

        {/* 지역/나라 */}
        {profile?.role === "KUDDY" ? (
          <EditItem
            subtitle="region"
            value={profile?.activeRegion}
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
        <EditItem
          subtitle="language"
          value={languageText}
          onClick={() => handleOpenModal("language")}
        />
        <div className="profile-line"></div>

        {/* 흥미 */}
        <EditItem
          subtitle="interest"
          value={interestText}
          onClick={() => handleOpenModal("interest")}
        />
      </div>
    </div>
  );
};

export default ProfileModifyPage;
