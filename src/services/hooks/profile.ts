import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import {
  profileState,
  uniqueNameState,
  interestsArrState,
  userInfoState,
} from "@services/store/auth";
import { profileIntroduce } from "@services/store/profile";
import {
  profileCheckNickname,
  profileGetSocialProfile,
  profileCreateTheFirstProfile,
  profileGetProfile,
  profileGetProfileByName,
  profileGetByFilter,
  profilePutModify,
  profileDeleteReview,
} from "@services/api/profile";
import { useRecoilState, useRecoilValue } from "recoil";
import useCheckNickname from "@utils/hooks/useCheckNickname";
import useInfiniteScroll from "@utils/hooks/useInfiniteScroll";

import { useAuthReLogin } from "./auth";

import useIsValidDate from "@utils/hooks/useIsValidDate";
import {
  deleteReviewFailAlert,
  deleteReviewSuccessAlert,
} from "@components/_common/SweetAlert";

// ✅ 프로필 최초 생성
export const useCreateProfile = () => {
  // 전역에서 프로필 정보 가져오기
  const [profile, _] = useRecoilState(profileState);
  const [interestsArr, _i] = useRecoilState(interestsArrState);

  const navigate = useNavigate();

  const newProfile = JSON.parse(JSON.stringify(profile));

  // profile 가공 단계
  type itemType = { languageType: string; languageLevel: number };
  type accType = itemType[];

  // 1. 중복 선택한 언어는 걸러내기 + level number 타입으로 바꾸기
  const test = {
    Beginner: 1,
    Intermediate: 2,
    Advanced: 3,
    "Native Speaker": 4,
  };

  const filteredLangArr = newProfile.availableLanguages.reduce(
    (accumulator: accType, currentItem: itemType) => {
      const isDuplicate = accumulator.some(
        (item: itemType) => item.languageType === currentItem.languageType,
      );
      if (!isDuplicate) {
        let levelIndex = currentItem.languageLevel.toString();
        let NumberlanguageLevel = test[levelIndex as keyof typeof test];

        accumulator.push({
          ...currentItem,
          languageLevel: NumberlanguageLevel,
        });
      }
      return accumulator;
    },
    [],
  );

  newProfile.availableLanguages = filteredLangArr;

  // 2. 흥미 선택한거 가져와서, profile에 넣기
  let interests: Record<string, string[]> = {};

  const categories: string[] = [
    "artBeauty",
    "careerMajor",
    "entertainment",
    "food",
    "hobbiesInterests",
    "lifestyle",
    "sports",
  ];

  for (let i = 0; i < interestsArr.length; i++) {
    const temp = interestsArr[i].interests
      .filter(inter => inter.selected)
      .map(inter => inter.inter.toUpperCase().replace(/ /g, "_")); // 대문자와 언더바 조합으로 변경

    interests[categories[i]] = temp.length ? temp : ["NOT_SELECTED"];
  }

  newProfile.interests = interests; // 적용

  // 3. nation이 비어있다면 korea로 넣기
  if (!newProfile.nationality) newProfile.nationality = "KOREA";

  const { mutate: createProfile, isLoading } = useMutation(
    profileCreateTheFirstProfile,
    {
      onSuccess: res => {
        navigate("/auth/done");
      },
      onError: err => {
        console.log("실패", err);
      },
    },
  );

  const onCreateProfile = () => {
    createProfile(newProfile);
  };

  return { onCreateProfile, isLoading };
};

// ✅ default 프로필 이미지 + 닉네임 세팅하는 hook
export const useSetDefaultProfile = () => {
  const onUpdateProfile = useUpdateProfile();
  const ReLogin = useAuthReLogin();

  useEffect(() => {
    setDefaultInfo();
  }, []);

  const setDefaultInfo = async () => {
    try {
      const { data }: any = await profileGetSocialProfile();

      let nickname = data.data.nickname;
      let profileImageUrl = data.data.profileImageUrl;

      onUpdateProfile({ nickname: nickname, profileImageUrl: profileImageUrl });
    } catch (err: any) {
      let errCode = err.response.status;
      console.log("기본 정보 조회 실패", err);
    }
  };
};

// ✅ 프로필 조회 훅
export const useGetProfile = () => {
  const { data, isLoading, error, refetch } = useQuery(
    "userProfile",
    profileGetProfile,
    {
      staleTime: 1800000,
      cacheTime: Infinity,
    },
  );
  const profile = useRecoilValue(profileState);
  useEffect(() => {
    refetch();
  }, [profile]);
  return { data, isLoading, error };
};

// ✅ 프로필 업데이트 훅
export const useUpdateProfile = () => {
  const [profile, setProfile] = useRecoilState(profileState);

  const onUpdateProfile = (updates: any) => {
    setProfile(profile => ({
      ...profile,
      ...updates,
    }));
  };

  return onUpdateProfile;
};

// ✅ 기본 프로필 업데이트 훅
export const useUpdateDefaultProfile = () => {
  const [_, setDefaultInfo] = useRecoilState(userInfoState);

  const onUpdateProfile = (updates: any) =>
    setDefaultInfo(profile => ({
      ...profile,
      ...updates,
    }));

  return onUpdateProfile;
};

// ✅ Next 버튼 활성화 검사 hook
export const useCanNext = () => {
  const [profile, setProfile] = useRecoilState(profileState);
  const [uniqueName, setUniqueName] = useRecoilState(uniqueNameState);

  const [checkBeforeToday, _] = useIsValidDate();

  const onCanNextNow = (type: string) => {
    let canNext = false;

    if (type === "uniqueName") {
      canNext = uniqueName;
    } else if (type === "birthDate") {
      // 생일이 오늘 이전이어야함
      canNext = profile.birthDate !== "" && checkBeforeToday(profile.birthDate);
    } else if (type === "job") {
      canNext = profile.job !== "";
    } else if (type === "region") {
      canNext = !!profile.districts.length;
    } else if (type === "nationality") {
      canNext = profile.nationality !== "";
    } else if (type === "language") {
      let tempArr = profile.availableLanguages.filter(
        lang =>
          lang.languageLevel === "Level" || lang.languageType === "Language",
      );
      canNext = !tempArr.length; // 하나도 없어야 넘어가기 가능
    } else if (type === "userType") {
      canNext = profile.roleType === "KUDDY" || profile.roleType === "TRAVELER";
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
      return data.message === "SUCCESS";
    } catch (err: any) {
      const errMessage = err.response.data.message;
      if (errMessage === "중복된 닉네임이 존재합니다.") {
        console.log(errMessage);
        return false;
      }
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
    alertText = "Maximum  15 letters";
    textColor = "red-alert";
  } else if (newName.length < 3) {
    alertText = "Minimum 3 characters";
    textColor = "red-alert";
  }

  return [alertText, textColor];
};

// 프로필 수정
export const usePutProfileModify = () => {
  const interestKey = [
    "artBeauty",
    "careerMajor",
    "entertainment",
    "food",
    "hobbiesInterests",
    "lifestyle",
    "sports",
  ];
  const profile = useRecoilValue(profileState);
  const introduce = useRecoilValue(profileIntroduce);
  const interestsArr = useRecoilValue(interestsArrState);

  let newInterests: Record<string, string[]> = {
    activitiesInvestmentTech: [],
    artBeauty: [],
    careerMajor: [],
    lifestyle: [],
    entertainment: [],
    food: [],
    hobbiesInterests: [],
    sports: [],
    wellbeing: [],
  };

  for (let i = 0; i < interestsArr.length; i++) {
    const temp = interestsArr[i].interests
      .filter(interest => interest.selected)
      .map(interest => interest.inter.toUpperCase().replace(/ /g, "_"));

    newInterests[interestKey[i]] = temp.length ? temp : ["NOT_SELECTED"];
  }

  let newProfile = {
    ...profile,
    introduce: introduce,
    interests: newInterests,
  };

  const onProfileModify = async () => {
    try {
      const res = await profilePutModify(newProfile);
      return res;
    } catch (err) {
      console.log(err);
    }
  };
  return onProfileModify;
};

// 닉네임으로 프로필 조회
export const useGetProfileByName = () => {
  const onGetProfileByName = async (nickname: string) => {
    try {
      const res = await profileGetProfileByName(nickname);
      return res.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  return onGetProfileByName;
};

// 필터로 프로필 조회 (무한 스크롤)
export const useGetProfileByFilter = (filter: ProfileGetByFilterType) => {
  const { pageLastItemRef, data, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteScroll({
      queryKey: ["filteredProfile", filter],
      fetch: profileGetByFilter,
      fetchParams: { size: 10, filter: filter },
      onIntersect: async (entry, observer) => {
        observer.unobserve(entry.target);
        if (hasNextPage && !isFetching) fetchNextPage();
      },
    });
  return { pageLastItemRef, hasNextPage, data, isFetching };
};

// 리뷰 삭제
export const useDeleteReview = () => {
  const onDeleteReview = async (id: number) => {
    try {
      const res = await profileDeleteReview(id);
      deleteReviewSuccessAlert();
      return res;
    } catch (err) {
      deleteReviewFailAlert();
      console.log(err);
    }
  };

  return onDeleteReview;
};
