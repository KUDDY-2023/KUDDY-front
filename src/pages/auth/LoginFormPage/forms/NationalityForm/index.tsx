import "./nationalityform.scss";
import { useState } from "react";
import DropDown from "@components/_common/DropDown";

import { useRecoilState } from "recoil";
import { profileState } from "@services/store/auth";
import { useUpdateProfile } from "@services/hooks/auth";
export default function NationalityForm() {
  const [profile, setProfile] = useRecoilState(profileState); // 전역상태

  const [nation, setNation] = useState<string>(
    profile.nationality || "Nationality",
  ); // 연결

  const nations = ["Korea", "US", "Ch"];

  const _handlSelectLanguage = (id: number, type: string, selected: string) => {
    setNation(selected);
    onUpdateProfile({ nationality: selected }); // 전역
  };

  const onUpdateProfile = useUpdateProfile();

  return (
    <div className="nationality-form-container">
      <p className="title">Choose your nationality</p>

      <div className="form-container">
        <DropDown
          items={nations}
          type="Nationality"
          id={1}
          state={nation}
          placeholder="Nationality"
          onSelect={_handlSelectLanguage}
        />
      </div>
    </div>
  );
}
