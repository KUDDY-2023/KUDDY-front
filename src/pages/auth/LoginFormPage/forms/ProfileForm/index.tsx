import "./profileform.scss";
import { useState, useCallback, useEffect } from "react";
// import profile from "@assets/auth/user.png";
import { ReactComponent as Camera } from "@assets/auth/camera.svg";

import { useRecoilState } from "recoil";
import { profileState, uniqueNameState } from "@services/store/auth";
import {
  useUpdateProfile,
  useCheckAvailableNickname,
  CheckNicknameString,
} from "@services/hooks/profile";

import { useGetPresignedUrl, usePostImage } from "@services/hooks/image";

export default function ProfileForm() {
  const [profile, setProfile] = useRecoilState(profileState); // 전역상태
  const [name, setName] = useState(profile.nickname); // 이름
  const [profileImgUrl, setProfileImgUrl] = useState(profile.profileImageUrl); // 프로필
  const [nameAlert, setNameAlert] = useState({
    alert: "Only alphabetic, numeric, and underbar",
    textColor: "grey-alert",
  });
  const [isAvailable, setIsAvailable] = useRecoilState(uniqueNameState); // 전역상태

  const onUpdateProfile = useUpdateProfile();
  const onGetUrl = useGetPresignedUrl();
  const onPostImage = usePostImage();

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 중복 검사 상태 False로 바꾸기
    setIsAvailable(false);

    // 닉네임 변경
    let newName = e.target.value;
    let [alertText, textColor] = CheckNicknameString(newName);

    // 경고 문구 반영
    setNameAlert({
      textColor: textColor,
      alert: alertText,
    });

    setName(newName); // state
    setProfile({ ...profile, nickname: newName }); // 전역
  };

  const onChangeProfileImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    let fileName = e.target.files[0].name;
    const presignedUrlList = await onGetUrl([fileName]); // url 받아오기
    if (presignedUrlList) {
      try {
        const res = await onPostImage(presignedUrlList[0], e.target.files[0]);
        console.log("이미지 업로드 성공", res);

        let newImg = presignedUrlList[0].split("?")[0];
        setProfileImgUrl(newImg);
        onUpdateProfile({
          profileImageUrl: newImg,
        });
      } catch (err) {
        alert(err);
      }
    }
  };

  const onCheck = useCheckAvailableNickname();

  const onCheckAvailableNickname = async () => {
    if (nameAlert.alert === "Please press the checking button") {
      const available = await onCheck(name);
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

  useEffect(() => {
    if (isAvailable) {
      setNameAlert({
        textColor: "blue-alert",
        alert: "You can use this name",
      });
    }
  }, [isAvailable]);

  useEffect(() => {
    // 맨 처음에만 실행
    let [alertText, textColor] = CheckNicknameString(name);
    setNameAlert({
      textColor: textColor,
      alert: alertText,
    });
  }, []);
  return (
    <div className="profile-img-form-container">
      <p className="title">Set your profile</p>

      <div className="form-container">
        <label htmlFor="profile-input" className="profile-container">
          <div id="profile">
            <img src={profileImgUrl} alt="profile" />
          </div>
          <Camera />
        </label>
        <input
          type="file"
          id="profile-input"
          accept="image/*"
          hidden
          onChange={onChangeProfileImg}
        />

        <input
          placeholder="nickname"
          value={name}
          onChange={e => onChangeNickname(e)}
          type="text"
        />
        <div className={`status-text ${nameAlert.textColor}`}>
          <p>{nameAlert.alert}</p>
          <p>{name.length}/15</p>
        </div>
        <div className="checking-btn-container">
          <button
            onClick={onCheckAvailableNickname}
            className={`checking-btn ${
              isAvailable ? "grey-btn" : "yellow-btn"
            }`}
          >
            checking
          </button>
        </div>
      </div>
    </div>
  );
}
