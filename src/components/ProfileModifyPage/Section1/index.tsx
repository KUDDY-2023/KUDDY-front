import "./section1.scss";
import { useState, useEffect } from "react";
import photoBtn from "@assets/profile/photo.svg";
import BasicModifyForm from "@components/ProfileModifyPage/forms/BasicModifyForm";
import {
  useUpdateProfile,
  useCheckAvailableNickname,
  CheckNicknameString,
} from "@services/hooks/profile";
import { useGetPresignedUrl, usePostImage } from "@services/hooks/image";
import { useRecoilState } from "recoil";
import { profileState, uniqueNameState } from "@services/store/auth";
import { profileIntroduce } from "@services/store/profile";

// 프로필 사진 ~ 소개글 섹션
const Section1 = () => {
  const [profile, setProfile] = useRecoilState(profileState); // 프로필 전역 상태
  const onUpdateProfile = useUpdateProfile();
  // 프로필 사진 관련
  const onGetUrl = useGetPresignedUrl();
  const onPostImage = usePostImage();
  // 닉네임 관련
  const [isAvailable, setIsAvailable] = useRecoilState(uniqueNameState); // 닉네임 사용 가능 여부
  const [nameAlert, setNameAlert] = useState({
    alert: isAvailable
      ? "You can use this name"
      : "Only alphabetic, numeric, and underbar",
    textColor: isAvailable ? "blue-alert" : "grey-alert",
  }); // 닉네임 중복 체크 alert
  const onCheck = useCheckAvailableNickname();
  // 소개글 관련
  const [introduce, setIntroduce] = useRecoilState(profileIntroduce); // 프로필 introduce 전역 상태

  // 처음엔 이름 중복 체크 완료된 상태로 렌더링
  useEffect(() => {
    setIsAvailable(true);
  }, []);

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
        console.log(err);
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

  return (
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
            <input
              type="text"
              className="profile-content"
              placeholder={profile?.nickname}
              value={profile?.nickname || ""}
              onChange={e => onChangeNickname(e)}
            />
            <div className="name-check-container">
              <div className={`status-text ${nameAlert.textColor}`}>
                <p>
                  {nameAlert.alert} ({profile?.nickname?.length}/15)
                </p>
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
      </div>
    </>
  );
};

export default Section1;
