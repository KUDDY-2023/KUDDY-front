import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import {
  profileState,
  uniqueNameState,
  interestsArrState,
} from "@services/store/auth";
import {
  profileCheckNickname,
  profileGetSocialProfile,
  profileCreateTheFirstProfile,
  profileGetProfile,
} from "@services/api/profile";
import { useRecoilState } from "recoil";
import useCheckNickname from "@utils/hooks/useCheckNickname";

import { useAuthReLogin } from "./auth";

// ✅ 프로필 최초 생성
export const useCreateProfile = () => {
  const update = useUpdateProfile();

  // 전역에서 프로필 정보 가져오기
  const [profile, _] = useRecoilState(profileState);
  const [interestsArr, _i] = useRecoilState(interestsArrState);

  const navigate = useNavigate();

  const newProfile = JSON.parse(JSON.stringify(profile));

  // profile 가공 필요
  // 1. 사용 가능 언어 level number 타입으로 바꾸기
  let newL = newProfile.availableLanguages.map((l: any) => {
    return { ...l, languageLevel: Number(l.languageLevel) };
  });

  newProfile.availableLanguages = newL;

  // 2. 흥미 선택한거 가져와서, profile에 넣기
  let interests: Record<string, string[]> = {};

  const categories: string[] = [
    "artBeauty",
    "activitiesInvestmentTech",
    "careerMajor",
    "entertainment",
    "food",
    "hobbiesInterests",
    "lifestyle",
    "sports",
    "wellbeing",
  ];

  for (let i = 0; i < interestsArr.length; i++) {
    const temp = interestsArr[i].interests
      .filter(inter => inter.selected)
      .map(inter => inter.inter);

    interests[categories[i]] = temp.length ? temp : ["NOT_SELECTED"];
  }

  newProfile.interests = interests; // 적용

  // 3. nation이 비어있다면 korea로 넣기
  if (!newProfile.nationality) newProfile.nationality = "KOREA";

  const { mutate: createProfile } = useMutation(profileCreateTheFirstProfile, {
    onSuccess: res => {
      navigate("/");
    },
    onError: err => {
      console.log("실패", err);
    },
  });

  const onCreateProfile = () => {
    createProfile(newProfile);
  };

  return { onCreateProfile };
};

// ✅ default 프로필 이미지 + 닉네임 세팅하는 hook
export const useSetDefaultProfile = () => {
  const onUpdateProfile = useUpdateProfile();
  const { ReLogin } = useAuthReLogin();

  useEffect(() => {
    setDefaultInfo();
  }, []);

  const setDefaultInfo = async () => {
    try {
      const { data }: any = await profileGetSocialProfile();

      let nickname = data.data.nickname;
      let profileImageUrl = data.data.profileImageUrl;

      onUpdateProfile({ nickname: nickname, profileImageUrl: profileImageUrl });
    } catch (err) {
      // 401 에러면
      //if() ReLogin();

      console.log("기본 정보 조회 실패", err);
    }
  };
};

// ✅ 프로필 조회 훅
export const useGetProfile = () => {
  const { data, isLoading, error } = useQuery("userProfile", profileGetProfile);
  return { data, isLoading, error };
};

// ✅ 프로필 업데이트 훅
export const useUpdateProfile = () => {
  const [profile, setProfile] = useRecoilState(profileState);

  const onUpdateProfile = (updates: any) =>
    setProfile(profile => ({
      ...profile,
      ...updates,
    }));

  return onUpdateProfile;
};

// ✅ Next 버튼 활성화 검사 hook
export const useCanNext = () => {
  const [profile, setProfile] = useRecoilState(profileState);
  const [uniqueName, setUniqueName] = useRecoilState(uniqueNameState);

  const onCanNextNow = (type: string) => {
    let canNext = false;

    if (type === "uniqueName") {
      canNext = uniqueName;
    } else if (type === "age") {
      canNext = profile.age !== 0; // 음수 고려하기..
    } else if (type === "job") {
      canNext = profile.job !== "";
    } else if (type === "region") {
      canNext = !!profile.districts.length;
    } else if (type === "nationality") {
      canNext = profile.nationality !== "";
    } else if (type === "language") {
      canNext = !!profile.availableLanguages.length;
    } else {
      canNext = true;
    }

    return canNext;
  };

  return onCanNextNow;
};

// ✅ 닉네임 중복 확인 hook
export const useCheckAvailableNickname = () => {
  const onCheck = async (nickname: string) => {
    try {
      const { data }: any = await profileCheckNickname(nickname);
      console.log(data.message);
      return data.message === "SUCCESS";
    } catch (err) {
      console.log("닉네임 중복 검사 실패");
      console.log(err);
    }
  };

  return onCheck;
};

// ✅ 닉네임 검사 hook
export const CheckNicknameString = (newName: string) => {
  const onCheckNickname = useCheckNickname();

  let alertText = "Please press the checking button";
  let textColor = "grey-alert";

  // 유효성 검사 + 글자수 검사
  if (!onCheckNickname(newName)) {
    alertText = "Only alphabetic, numeric, and underbar";
    textColor = "red-alert";
  } else if (newName.length > 15) {
    alertText = "Up to 15 letters";
    textColor = "red-alert";
  } else if (newName.length < 3) {
    alertText = "At least 3 letters";
    textColor = "red-alert";
  }

  return [alertText, textColor];
};
