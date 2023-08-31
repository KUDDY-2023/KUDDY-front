import { atom, selector } from "recoil";
//import { recoilPersist } from 'recoil-persist';
// const { persistAtom } = recoilPersist();
/*
export const accessToken = atom<boolean>({
  key: 'accessToken',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
// 다른 파일에서 사용할 때 
import { useRecoilState } from 'recoil';
import { LoginState } from 'States/LoginState';
const [accessToken, setAccessToken] = useRecoilState(LoginState);
*/

// export const accessToken = atom<string>({ key: "accessToken", default: "" });
// export const isUserLoggedIn = selector({
//   key: "isUserLoggedIn",
//   get: ({ get }) => !!get(accessToken), // accessToken의 유무로 로그인 여부 확인
// });

// 프로필 등록 Atom
export const profileState = atom<IUserProfile>({
  key: "profileState",
  default: {
    roleType: "KUDDY",
    nickname: "Jane", // 카카오에서 가져온거 넣어야 하는데
    // 카카오에서 가져온거 기본 값 설정
    profileImage:
      "https://file3.instiz.net/data/cached_img/upload/2021/07/01/23/d98ce916efb0fad63fd3e857e4b674e9.jpg",
    gender: "MR",
    age: 0,
    temperament: "INTROVERT",
    decisionMaking: "JUDGING",
    job: "",
    nationality: "",
    availableLanguages: [],
    districts: [],
  },
});

// 최초 로그인 후 프로필과 이미지 등록할 수 있도록 해야함

// 유저 타입 꺼내는 셀렉터
export const userTypeState = selector({
  key: "userTypeState",
  get: ({ get }) => get(profileState).roleType,
});

// 프로필 완성도 state - progressbar에서 사용

// next 가능성 따지는 state
