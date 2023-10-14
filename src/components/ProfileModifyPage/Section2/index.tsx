import "./section2.scss";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import DropDown from "@components/_common/DropDown";
import BasicModifyForm from "@components/ProfileModifyPage/forms/BasicModifyForm";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import { useUpdateProfile } from "@services/hooks/profile";
import { profileState } from "@services/store/auth";

// 성별 ~ 성격 섹션
const Section2 = () => {
  const [profile, setProfile] = useRecoilState(profileState); // 프로필 전역 상태
  const onUpdateProfile = useUpdateProfile();
  // 성별 관련
  const [gender, setGender] = useState(""); // 선택한 성별 텍스트
  const genders = ["Male", "Female", "Prefer not to say"];
  // 성격 관련
  const [personality, setPersonality] = useState([0, 0]);
  const temperament = ["Introvert", "Extrovert"];
  const decisionMaking = ["Prefer planning", "Prefer spontaneous"];

  // 🚨 로컬 스토리지에 저장된 생일 제거
  useEffect(() => {
    return () => {
      localStorage.removeItem("birthDate");
    };
  }, []);

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
      default:
        genderTemp = "Prefer not to say";
    }
    setGender(genderTemp);
  }, [profile?.genderType]);

  const handleSelectGender = (id: number, type: string, selected: string) => {
    let newGender;
    switch (selected) {
      case "Male":
        newGender = "MR";
        break;
      case "Female":
        newGender = "MS";
        break;
      case "Prefer not to say":
        newGender = "NEUTRAL";
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
  useEffect(() => {
    setPersonality([
      profile?.temperament === "INTROVERT" ? 0 : 1,
      profile?.decisionMaking === "JUDGING" ? 0 : 1,
    ]);
  }, [profile?.temperament, profile?.decisionMaking]);

  const handleTemperamentClick = (
    id: number,
    type: string,
    selected: string,
  ) => {
    id === 0
      ? onUpdateProfile({ temperament: "INTROVERT" })
      : onUpdateProfile({ temperament: "EXTROVERT" });
  };

  const handleDecisionClick = (id: number, type: string, selected: string) => {
    id === 0
      ? onUpdateProfile({ decisionMaking: "JUDGING" })
      : onUpdateProfile({ decisionMaking: "PROSPECTING" });
  };

  return (
    <div className="section2-container">
      <div className="detail-modify-container">
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
              format="YYYY/MM/DD"
              defaultValue={dayjs(
                localStorage.getItem("birthDate")?.replaceAll(".", "/"),
              )}
              onChange={(value: any) => {
                handleSelectAge(formatDate(value.$d));
              }}
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
          <div className="personality-container">
            <div className="modify-dropdown">
              <DropDown
                items={temperament}
                type="Personality"
                placeholder="Personality"
                id={1}
                state={temperament[personality[0]]}
                onSelect={handleTemperamentClick}
              />
            </div>
            <div className="modify-dropdown">
              <DropDown
                items={decisionMaking}
                type="Personality"
                placeholder="Personality"
                id={1}
                state={decisionMaking[personality[1]]}
                onSelect={handleDecisionClick}
              />
            </div>
          </div>
        </BasicModifyForm>
      </div>
    </div>
  );
};

export default Section2;
