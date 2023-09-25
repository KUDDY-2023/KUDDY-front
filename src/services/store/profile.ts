import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const buddyType = atom<string>({
  key: "buddyType",
  default: "K-Buddy",
  effects_UNSTABLE: [persistAtom],
});

export const profileFilter = atom<ProfileGetByFilterType>({
  key: "profileFilter",
  default: {
    genderType: "",
    languageType: "",
    areaName: "",
    interestGroup: "",
    interestContent: "",
    nickname: "",
    role:
      JSON.parse(String(localStorage.getItem("recoil-persist")))[
        "buddyType"
      ] === "K-Buddy"
        ? "KUDDY"
        : "TRAVELER",
  },
});
