import "./profile-modify-page.scss";
import { useEffect } from "react";
import Loading from "@components/_common/Loading";
import Section1 from "@components/ProfileModifyPage/Section1";
import Section2 from "@components/ProfileModifyPage/Section2";
import Section3 from "@components/ProfileModifyPage/Section3";
import { profileNameAlert } from "@components/_common/SweetAlert";
import { useGetProfile, usePutProfileModify } from "@services/hooks/profile";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  profileState,
  uniqueNameState,
  interestsArrState,
} from "@services/store/auth";
import { profileIntroduce, nameCheckAlert } from "@services/store/profile";
import useInterest from "@utils/hooks/useInterest";

const ProfileModifyPage = () => {
  const nav = useNavigate();
  const [profile, setProfile] = useRecoilState(profileState); // 프로필 전역 상태
  const isAvailable = useRecoilValue(uniqueNameState); // 닉네임 사용 가능 여부
  const nameAlert = useRecoilValue(nameCheckAlert);
  const [introduce, setIntroduce] = useRecoilState(profileIntroduce); // 프로필 introduce 전역 상태
  const [interestsArr, setInterestsArr] = useRecoilState(interestsArrState); // interest 전역 상태 (값 읽기)
  const { altElement } = useInterest();
  const { data, isLoading, error } = useGetProfile();
  const onProfileModify = usePutProfileModify();
  const interestType = [
    "artBeauty",
    "careerMajor",
    "entertainment",
    "food",
    "hobbiesInterests",
    "lifestyle",
    "sports",
  ];

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
        const temp = myProfile?.interests[interestType[index]].map(
          (interest: string) => {
            return interest !== "NOT_SELECTED"
              ? altElement(interest).replace(" food", "")
              : "";
          },
        );

        console.log(temp);

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
    }
  }, [isLoading]);

  // complete 버튼 클릭
  const handleCompleteClick = async () => {
    // 닉네임 체크 필요
    if (!isAvailable) {
      if (nameAlert === "Minimum 3 characters") {
        profileNameAlert("Please enter at least 3 characters for your name.");
      } else if (nameAlert === "Only alphabetic, numeric, and underbar") {
        profileNameAlert(
          "Please enter your name using only alphabetic, numeric, and underbar.",
        );
      } else {
        profileNameAlert(nameAlert);
      }
      return;
    }
    const res = await onProfileModify();
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

      {!profile ? (
        <Loading backColor="transparent" spinnerColor="#eee" size="30px" />
      ) : (
        <>
          <Section1 />
          <Section2 />
          <Section3 />
        </>
      )}
    </div>
  );
};

export default ProfileModifyPage;
