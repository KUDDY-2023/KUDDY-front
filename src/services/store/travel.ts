import { atom, selector } from "recoil";

// 현재 위치 좌표 저장
export const currentPosition = atom<Position>({
  key: "currentPosition",
  default: {
    y: 33.450701,
    x: 126.570667,
  },
});
