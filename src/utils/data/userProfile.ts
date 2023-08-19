// 커디 유저 프로필
export const initialKuddyProfileData: KuddyUserProfile = {
  type: "0",
  nickname: "",
  gender: "",
  age: 1,
  profile: "이미지파일..", // img는 어케하지 ??
  job: "",
  introvert: true,
  judging: true,
  language: ["en-well"],
  interests: ["밥먹기", "술마시기"],
  area: [0, 1, 2, 3],
};

// 여행자 유저 프로필
export const initialTravelerProfileData: TravelerUserProfile = {
  type: "1",
  nickname: "",
  gender: "",
  age: 1,
  profile: "", // img는 어케하지 ??
  job: "",
  introvert: true,
  judging: true,
  language: ["en-well"],
  interests: ["밥먹기", "술마시기"],
  nationality: 1,
};
