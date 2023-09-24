import { atom } from "recoil";

export const profileFilter = atom({
  key: "profileFilter",
  default: {
    gender: "",
    languageType: "",
    areaName: "",
    interestGroup: "",
    interestContent: "",
    nickname: "",
  },
});
