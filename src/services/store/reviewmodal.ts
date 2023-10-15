import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const neverShowMeetupId = atom<number[]>({
  key: "neverShowMeetupId",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
