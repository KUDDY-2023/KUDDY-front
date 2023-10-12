import "./profile-modify-page.scss";
import { useState, useEffect } from "react";
import photoBtn from "@assets/profile/photo.svg";
import DropDown from "@components/_common/DropDown";
import EditModal from "@components/ProfileModifyPage/EditModal";
import BasicModifyForm from "@components/ProfileModifyPage/BasicModifyForm";
import EditBtnModifyForm from "@components/ProfileModifyPage/EditBtnModifyForm";
import Loading from "@components/_common/Loading";
import {
  useUpdateProfile,
  useGetProfile,
  usePutProfileModify,
  useCheckAvailableNickname,
  CheckNicknameString,
} from "@services/hooks/profile";
import { useGetPresignedUrl, usePostImage } from "@services/hooks/image";
import { useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import {
  profileState,
  interestsArrState,
  uniqueNameState,
} from "@services/store/auth";
import { profileIntroduce } from "@services/store/profile";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import useInterest from "@utils/hooks/useInterest";

const ProfileModifyPage = () => {
  const nav = useNavigate();
  const genders = ["Male", "Female", "Prefer not to say"];
  const languages = ["Beginner", "Intermediate", "Advanced", "Native Speaker"];
  const interestType = [
    "artBeauty",
    "careerMajor",
    "entertainment",
    "food",
    "hobbiesInterests",
    "lifestyle",
    "sports",
  ];

  const [profile, setProfile] = useRecoilState(profileState); // 프로필 전역 상태
  const [introduce, setIntroduce] = useRecoilState(profileIntroduce); // 프로필 introduce 전역 상태
  const [interestsArr, setInterestsArr] = useRecoilState(interestsArrState); // interest 전역 상태 (값 읽기)

  const [isAvailable, setIsAvailable] = useRecoilState(uniqueNameState); // 닉네임 사용 가능 여부
  const [nameAlert, setNameAlert] = useState({
    alert: isAvailable
      ? "You can use this name"
      : "Only alphabetic, numeric, and underbar",
    textColor: isAvailable ? "blue-alert" : "grey-alert",
  }); // 닉네임 중복 체크 alert
  const [gender, setGender] = useState(""); // 선택한 성별 텍스트
  const [regionText, setRegionText] = useState(""); // 선택한 지역 텍스트로 표현
  const [languageText, setLanguageText] = useState(""); // 선택한 언어 텍스트로 표현
  const [interestText, setInterestText] = useState(""); // 선택한 interest 텍스트로 표현
  const [isOpenModal, setIsOpenModal] = useState(false); // 편집 모달 오픈 여부
  const [form, setForm] = useState(""); // 오픈할 모달 형식
  const { data, isLoading, error } = useGetProfile();
  const onProfileModify = usePutProfileModify();
  const onUpdateProfile = useUpdateProfile();
  const onGetUrl = useGetPresignedUrl();
  const onPostImage = usePostImage();
  const { altElement } = useInterest();
  const onCheck = useCheckAvailableNickname();

  // 내 프로필 정보 가져오기
  useEffect(() => {
    if (data) {
      const myProfile = data.data.data;

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
      const newInterests = interestsArr.map((category, index) => {
        // 내 프로필에 포함된 interest 배열
        const temp = myProfile?.interests[interestType[index]];
        return {
          ...category,
          interests: category.interests.map(interest => {
            //만약 프로필에 포함된 interest이면 selected 수정
            return temp.includes(interest.inter)
              ? { ...interest, selected: true }
              : interest;
          }),
        };
      });
      setInterestsArr(newInterests);

      if (!isAvailable) {
        let [alertText, textColor] = CheckNicknameString(profile?.nickname);
        setNameAlert({
          textColor: textColor,
          alert: alertText,
        });
      }
    }
  }, [isLoading]);

  // 프로필 이미지 관련
  const handlePhotoBtnClick = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!e.target.files) return;

    let fileName = e.target.files[0].name; // 파일 이름 저장
    const presignedUrlList = await onGetUrl([fileName]); // url 받아오기
    if (presignedUrlList) {
      try {
        const res = await onPostImage(presignedUrlList[0], e.target.files[0]);
        let newImg = presignedUrlList[0].split("?")[0];
        onUpdateProfile({
          profileImageUrl: newImg,
        });
      } catch (err) {
        alert(err);
      }
    }
  };

  // 닉네임 관련
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAvailable(false);

    let newName = e.target.value;
    let [alertText, textColor] = CheckNicknameString(newName);

    // 경고 문구
    setNameAlert({
      textColor: textColor,
      alert: alertText,
    });

    setProfile({ ...profile, nickname: newName });
  };

  // 중복 체크 관련
  useEffect(() => {
    if (isAvailable) {
      setNameAlert({
        textColor: "blue-alert",
        alert: "You can use this name",
      });
    }
  }, [isAvailable]);

  const onCheckAvailableNickname = async () => {
    if (nameAlert.alert === "Please press the checking button") {
      const available = await onCheck(profile?.nickname);
      if (available) {
        setIsAvailable(true);
      } else {
        setIsAvailable(false);
        setNameAlert({
          textColor: "red-alert",
          alert: "Name already registered",
        });
      }
    }
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
    onUpdateProfile({
      genderType: newGender,
    });
  };

  // birth date 관련
  const formatDate = (inputDateString: string) => {
    let dateParts = String(inputDateString).split(" ");
    let extractedDate = dateParts.slice(1, 4).join(" ");

    let parsedDate = new Date(extractedDate); // 추출한 부분을 Date 객체로 파싱

    // 날짜를 "2021-11-05" 형식으로 포맷팅
    let formattedDate =
      parsedDate.getFullYear() +
      "." +
      ("0" + (parsedDate.getMonth() + 1)).slice(-2) +
      "." +
      ("0" + parsedDate.getDate()).slice(-2);

    return formattedDate;
  };

  const handleSelectAge = (newBirth: string) => {
    onUpdateProfile({ birthDate: newBirth });
  };

  // personality 관련
  const handlePersonalityClick = (type: string, idx: number) => {
    if (type === "temperament") {
      {
        idx
          ? onUpdateProfile({ temperament: "EXTROVERT" })
          : onUpdateProfile({ temperament: "INTROVERT" });
      }
    } else {
      idx
        ? onUpdateProfile({ decisionMaking: "PROSPECTING" })
        : onUpdateProfile({ decisionMaking: "JUDGING" });
    }
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

  // complete 버튼 클릭
  const handleCompleteClick = async () => {
    // 닉네임 체크 필요
    if (!isAvailable) {
      alert(nameAlert.alert);
      return;
    }
    const res = await onProfileModify();
    console.log(res);
    nav(`/profile/${profile.nickname}`, { state: { prev: "modify" } });
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
      {!profile ? (
        <Loading backColor="transparent" spinnerColor="#eee" size="30px" />
      ) : (
        <>
          {/* 프로필 사진 */}
          <div className="profile-image-container">
            <img src={profile?.profileImageUrl} className="profile-image" />
            <label htmlFor="profile-image-input">
              <img src={photoBtn} className="photo-btn" />
            </label>
            <input
              type="file"
              id="profile-image-input"
              accept="image/*"
              hidden
              onChange={handlePhotoBtnClick}
            />
          </div>

          {/* 이름 */}
          <div className="detail-modify-container">
            <BasicModifyForm text="name">
              <div className="modify-name-container">
                <div className="modify-name-inner-container">
                  <input
                    type="text"
                    className="profile-content"
                    placeholder={profile?.nickname}
                    value={profile?.nickname || ""}
                    onChange={e => onChangeNickname(e)}
                  />
                  <div className={`status-text ${nameAlert.textColor}`}>
                    <p>
                      {nameAlert.alert} ({profile?.nickname?.length}/15)
                    </p>
                  </div>
                </div>
                <button
                  onClick={onCheckAvailableNickname}
                  className={`checking-btn ${
                    isAvailable ? "grey-btn" : "yellow-btn"
                  }`}
                >
                  checking
                </button>
              </div>
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
              <div className="modify-dropdown">
                <DropDown
                  items={genders}
                  type="Gender"
                  placeholder="Gender"
                  id={1}
                  state={gender}
                  onSelect={handleSelectGender}
                />
              </div>
            </BasicModifyForm>
            {/* 생일 추가 */}
            <BasicModifyForm text="birth">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  format="YYYY / MM / DD"
                  defaultValue={dayjs(profile?.birthDate)}
                  onChange={(value: any) =>
                    handleSelectAge(formatDate(value.$d))
                  }
                />
              </LocalizationProvider>
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
            <BasicModifyForm text="personality">
              <div className="vertical-container">
                <div className="personality-container">
                  <div
                    className={
                      profile?.temperament === "INTROVERT"
                        ? "personality-btn selected"
                        : "personality-btn"
                    }
                    onClick={() => handlePersonalityClick("temperament", 0)}
                  >
                    Introvert
                  </div>
                  <div
                    className={
                      profile?.temperament === "EXTROVERT"
                        ? "personality-btn selected"
                        : "personality-btn"
                    }
                    onClick={() => handlePersonalityClick("temperament", 1)}
                  >
                    Extrovert
                  </div>
                </div>
                <div className="personality-container">
                  <div
                    className={
                      profile?.decisionMaking === "JUDGING"
                        ? "personality-btn selected"
                        : "personality-btn"
                    }
                    onClick={() => handlePersonalityClick("decisionMaking", 0)}
                  >
                    Prefer planning
                  </div>
                  <div
                    className={
                      profile?.decisionMaking === "PROSPECTING"
                        ? "personality-btn selected"
                        : "personality-btn"
                    }
                    onClick={() => handlePersonalityClick("decisionMaking", 1)}
                  >
                    Prefer spontaneous
                  </div>
                </div>
              </div>
            </BasicModifyForm>

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
                <div className="modify-dropdown">
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
                </div>
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
        </>
      )}
    </div>
  );
};

export default ProfileModifyPage;
