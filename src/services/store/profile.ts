import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import defaultprofile from "@assets/topbar/profile_default.svg";

const { persistAtom } = recoilPersist();

export const profileImage = atom<string>({
  key: "profileImage",
  default: defaultprofile,
  effects_UNSTABLE: [persistAtom],
});

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
    role: localStorage.getItem("recoil-persist")
      ? JSON.parse(String(localStorage.getItem("recoil-persist")))[
          "buddyType"
        ] === "K-Buddy"
        ? "KUDDY"
        : JSON.parse(String(localStorage.getItem("recoil-persist")))[
            "buddyType"
          ] === "Traveler"
        ? "TRAVELER"
        : "KUDDY"
      : "KUDDY",
  },
});

export const profileIntroduce = atom<string>({
  key: "profileIntroduce",
  default: "",
});

export const nameCheckAlert = atom<string>({
  key: "nameCheckAlert",
  default: "",
});
