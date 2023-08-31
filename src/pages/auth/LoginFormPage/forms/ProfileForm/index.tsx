import "./profileform.scss";
import { useState, useCallback } from "react";
// import profile from "@assets/auth/user.png";
import { ReactComponent as Camera } from "@assets/auth/camera.svg";

import { useRecoilState } from "recoil";
import { profileState } from "@services/store/auth";
import { useUpdateProfile } from "@services/hooks/auth";

export default function ProfileForm() {
  const [profile, setProfile] = useRecoilState(profileState); // 전역상태
  const [name, setName] = useState(profile.nickname); // 이름
  const [profileImgUrl, setProfileImgUrl] = useState(profile.profileImage); // 프로필

  const onUpdateProfile = useUpdateProfile();

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newName = e.target.value;
    setName(newName);
    setProfile({ ...profile, nickname: newName });
  };

  const onChangeProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 1) input type=file에서 사진 고름
    if (!e.target.files) {
      return;
    }
    let fileName = e.target.files[0].name;

    // 2) url 하나 받아옴
    let body = {
      imgList: [fileName],
    };
    let presignedUrl = ""; // 받아온 url

    // 3) 해당 url로 s3 업로드 == presignedUrl로 put 메소드로 올린다.
    // body는 binary로 보내야함.
    /*

     코드 예시 
     function uploadImageToS3(presignedUrl: string, uploadFile: File) {
    console.log(uploadFile);
    setUploadedFile(uploadFile.name)
    console.log(uploadedFile) // 업로드할 파일 확인
  
    axios
      .put(presignedUrl, uploadFile, {
        headers: {
          'Content-Type': 'image/png', // 업로드할 파일의 콘텐츠 유형 지정
        },
      })
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  }
     */

    // 4) 해당 url로 profileImgUrl 업데이트
    // 성공하면 지역, 전역 상태 업데이트
    setProfileImgUrl(
      "https://image.blip.kr/v1/file/310072664ead6aaf16326c739c9c3347",
    );
    onUpdateProfile({
      profileImage:
        "https://image.blip.kr/v1/file/310072664ead6aaf16326c739c9c3347",
    });
  };

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
      </div>
    </div>
  );
}
