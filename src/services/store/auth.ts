import { profile } from "console";
import { atom, selector } from "recoil";
import { InterestData } from "@pages/auth/LoginFormPage/forms/InterestForm/interestsData";

// ⭐ 프로필 생성 Atom
export const profileState = atom<IUserProfile>({
  key: "profileState",
  default: {
    roleType: "KUDDY",
    nickname: "", // 카카오 기본 값 세팅
    profileImage: "", // 카카오 기본 값 세팅
    gender: "MR",
    age: 0,
    temperament: "INTROVERT",
    decisionMaking: "JUDGING",
    job: "",
    nationality: "", // 보내기 전에 커디 유저는 코리아로 보내기
    availableLanguages: [], // 보내기 전에 빈건 'NOT_SELECTED' 넣기
    districts: [],
    wellbeing: [],
    activitiesInvestmentTech: [],
    careerMajor: [],
    entertainment: [],
    hobbiesInterests: [],
    lifestyle: [],
    artBeauty: [],
    food: [],
    sports: [],
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
