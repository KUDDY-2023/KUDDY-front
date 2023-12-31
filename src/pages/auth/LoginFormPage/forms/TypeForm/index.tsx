import "./typeform.scss";
import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { profileState } from "@services/store/auth";
import { useUpdateProfile } from "@services/hooks/profile";

export default function TypeForm() {
  const [userType, setUserType] = useRecoilState(profileState); // 전역상태
  // 전역상태 - 버튼상태 연결
  let buttonState = [false, false];

  if (userType.roleType === "KUDDY") {
    buttonState = [true, false];
  } else if (userType.roleType === "TRAVELER") {
    buttonState = [false, true];
  }
  const [type, setType] = useState(buttonState); // 버튼 활성화

  const onUpdateProfile = useUpdateProfile();

  const _handleClickTypeBtn = (type: string) => {
    if (type === "k-buddy") {
      setType([true, false]);
      onUpdateProfile({ roleType: "KUDDY" });
    } else if (type === "traveler") {
      setType([false, true]);
      onUpdateProfile({ roleType: "TRAVELER" });
    }
  };

  return (
    <div className="type-form-container">
      <p className="title">Choose your user type</p>
      <div className="form-container">
        <div className="type-btn-container">
          <div
            className="inactive-type-btn"
            onClick={() => _handleClickTypeBtn("k-buddy")}
            id={type[0] ? "active" : ""}
          >
            K-Buddy
          </div>
          <p>Korean Users Providing Tour Guide Services</p>
        </div>
        <div className="type-btn-container">
          <div
            className="inactive-type-btn"
            onClick={() => _handleClickTypeBtn("traveler")}
            id={type[1] ? "active" : ""}
          >
            Traveler
          </div>
          <p>Foreign Travelers Looking for K-Buddy</p>
        </div>
      </div>
    </div>
  );
}
