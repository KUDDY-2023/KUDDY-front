import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authReportUser } from "@services/api/auth";
import { useQuery, useMutation } from "react-query";
import { profileState, uniqueNameState } from "@services/store/auth";
import { profileCheckNickname } from "@services/api/profile";
import { useRecoilState } from "recoil";

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
      const data: any = await profileCheckNickname(nickname);
      return data.message === "SUCCESS";
    } catch (err) {
      console.log("닉네임 중복 검사 실패");
      console.log(err);
    }
  };

  return onCheck;
};
