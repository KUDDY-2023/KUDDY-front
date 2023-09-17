import { atom } from "recoil";

// 현재 위치 좌표 저장
export const currentPosition = atom<Position>({
  key: "currentPosition",
  default: {
    y: 33.450701,
    x: 126.570667,
  },
});

// 사용자가 pick한 travel 배열 저장
export const pickedTravel = atom<TravelPreviewType[]>({
  key: "pickedTravel",
  default: [],
});

// 장소 검색 필터 조건 저장
export const travelFilter = atom<SpotGetByFilterType>({
  key: "travelFilter",
  default: {
    keyword: "",
    category: "",
    district: [],
  },
});
