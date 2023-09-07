import "./nationalityform.scss";
import { useState } from "react";
import DropDown from "@components/_common/DropDown";

import { useRecoilState } from "recoil";
import { profileState } from "@services/store/auth";
import { useUpdateProfile } from "@services/hooks/profile";
export default function NationalityForm() {
  const [profile, setProfile] = useRecoilState(profileState); // 전역상태
  const [nation, setNation] = useState<string>(profile.nationality); // 연결

  const onUpdateProfile = useUpdateProfile();

  const onChangeNationality = (nationalityText: string) => {
    setNation(nationalityText);
    onUpdateProfile({ nationality: nationalityText });
  };

  return (
    <div className="nationality-form-container">
      <p className="title">Choose your nationality</p>

      <div className="form-container">
        <p>Nationality</p>
        <input
          type="text"
          placeholder="Write your nationality"
          value={nation}
          onChange={e => onChangeNationality(e.target.value)}
        />
      </div>
    </div>
  );
}
