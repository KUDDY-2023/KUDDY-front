import "./profile-modify-page.scss";
import { ReactNode, useState, useEffect } from "react";
import photoBtn from "@assets/profile/photo.svg";
import DropDown from "@components/_common/DropDown";
import EditBtn from "@components/ProfileModifyPage/EditBtn";
import EditModal from "@components/ProfileModifyPage/EditModal";
import { useGetProfile } from "@services/hooks/profile";
import { TravelerUserData, KuddyUserData } from "@utils/data/userProfile";

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
  const data = KuddyUserData; // 임의
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
  const [profile, setProfile] = useState(data);
  const [languageText, setLanguageText] = useState("");
  const [interestText, setInterestText] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form, setForm] = useState("");

  /*
  const getMyProfile = () => {
    const res = useGetProfile();
    console.log(res);
  };

  useEffect(() => {
    getMyProfile();
  }, []);
  */

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
    profile.languages.forEach(l => {
      newLanguageText += `${l.languageType} - ${l.languageLevel}\n`;
    });
    setLanguageText(newLanguageText);
  }, [profile.languages]);

  // interest 관련
  useEffect(() => {
    let newValues = [];
    let newInterestText = "";

    for (let i = 0; i < interestKey.length; i++) {
      const temp = profile[interestKey[i]].filter(
        (v: any) => v !== "NOT_SELECTED",
      );

      if (temp.length !== 0) {
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
        <p>Cancel</p>
        <p id="blue-text">Complete</p>
      </div>

      <EditModal
        isModalOpen={isOpenModal}
        onClose={handleCloseModal}
        form={form}
      />

      <div className="profile-image-container">
        <img src={profile.profileImage} className="profile-image" />
        <img
          src={photoBtn}
          className="photo-btn"
          onClick={handlePhotoBtnClick}
        />
      </div>

      <div className="detail-modify-container">
        <ModifyItem text="name">
          <input
            type="text"
            className="profile-content"
            placeholder={profile.nickname}
            value={profile.nickname}
            onChange={e =>
              setProfile(p => ({ ...p, nickname: e.target.value }))
            }
          />
        </ModifyItem>

        <ModifyItem text="introduce">
          <textarea
            className="profile-content"
            placeholder={profile.introduction}
            value={profile.introduction}
            onChange={e =>
              setProfile(p => ({ ...p, introduction: e.target.value }))
            }
          />
        </ModifyItem>
        <div className="profile-line"></div>

        <ModifyItem text="gender">
          <DropDown
            items={genders}
            type="Gender"
            placeholder="Gender"
            id={1}
            state={profile.gender}
            onSelect={handleSelectGender}
          />
        </ModifyItem>
        <ModifyItem text="age">
          <input
            type="text"
            className="profile-content"
            placeholder={String(profile.age)}
            value={profile.age}
            onChange={e =>
              setProfile(p => ({
                ...p,
                age: Number(e.target.value.replace(/[^0-9]/g, "")),
              }))
            }
          />
        </ModifyItem>
        <ModifyItem text="job">
          <input
            type="text"
            className="profile-content"
            placeholder={profile.job}
            value={profile.job}
            onChange={e => setProfile(p => ({ ...p, job: e.target.value }))}
          />
        </ModifyItem>
        <div className="detail-modify-inner-container">
          <div className="profile-subtitle">personality</div>
          <div className="vertical-container"></div>
        </div>

        {data.role === "KUDDY" ? (
          <EditItem
            subtitle="region"
            value={profile.activeRegion || ""}
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
              state={profile.nationality || ""}
              onSelect={handleSelectNation}
            />
          </div>
        )}
        <EditItem
          subtitle="language"
          value={languageText}
          onClick={() => handleOpenModal("language")}
        />
        <div className="profile-line"></div>

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
