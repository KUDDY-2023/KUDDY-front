import { profile } from "console";
import { atom, selector } from "recoil";
import { InterestData } from "@pages/auth/LoginFormPage/forms/InterestForm/interestsData";

// ⭐ 로그인 여부
export const isLoginState = atom<boolean>({
  key: "isLoginState",
  default: !!localStorage.getItem("accessToken"),
});

// ⭐ 프로필 생성 Atom
export const profileState = atom<IUserProfile>({
  key: "profileState",
  default: {
    roleType: "KUDDY",
    nickname: "",
    profileImageUrl: "",
    genderType: "MR",
    age: 0,
    temperament: "INTROVERT",
    decisionMaking: "JUDGING",
    job: "",
    nationality: "",
    availableLanguages: [],
    districts: [],
  },
});

// ⭐ 닉네임 사용 가능 여부 atom
export const uniqueNameState = atom<boolean>({
  key: "uniqueNameState",
  default: false,
});

// ⭐ 흥미 atom
export const interestsArrState = atom({
  key: "interestsArrState",
  default: InterestData,
});

// 유저 타입 꺼내는 셀렉터
export const userTypeState = selector({
  key: "userTypeState",
  get: ({ get }) => get(profileState).roleType,
});
