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

export const accessToken = atom<string>({ key: "accessToken", default: "" });
export const isUserLoggedIn = selector({
  key: "isUserLoggedIn",
  get: ({ get }) => !!get(accessToken), // accessToken의 유무로 로그인 여부 확인
});
