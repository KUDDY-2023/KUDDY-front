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

// 추가 (프로필페이지에서 사용)
export const KuddyUserData: UserInfo = {
  memberId: 1,
  role: "KUDDY",
  nickname: "ian",
  profileImage:
    "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDJfMTM4/MDAxNjIyNjA5MzA1OTk4.8DiTAnBkxket9LiUgrL3mweXGHc-1wyNR1twaf8eM7Yg.MK0x-lU2LYHhLqcHLxg0MN9vZrFbCrUMQbere7MTRUYg.JPEG.seoraestudio/201214.%25EB%25B9%2584%25EB%258B%25A46151.jpg?type=w800",
  age: 29,
  job: "Photographer",
  introduction: "A photographer based in Seoul.  I know the best photo spots!",
  gender: "MS",
  temperament: "EXTROVERT",
  decisionMaking: "JUDGING",
  wellbeing: ["NOT_SELECTED"],
  activitiesInvestmentTech: ["NOT_SELECTED"],
  careerMajor: ["NOT_SELECTED"],
  entertainment: ["NOT_SELECTED"],
  hobbiesInterests: ["LANGUAGE", "SHOPPING", "TRAVEL"],
  lifestyle: ["NOT_SELECTED"],
  artBeauty: ["NOT_SELECTED"],
  food: ["NOT_SELECTED"],
  sports: ["SWIMMING", "BASEBALL", "BICYCLE"],
  languages: [
    {
      languageType: "English",
      languageLevel: "advanced",
    },
    {
      languageType: "Korean",
      languageLevel: "native speaker",
    },
  ],
  guideGrade: "guide grade",
  activeRegion: "Seodaemun Songpa",
};

export const TravelerUserData: UserInfo = {
  memberId: 2,
  role: "TRAVELER",
  nickname: "harper",
  profileImage:
    "https://mblogthumb-phinf.pstatic.net/MjAxOTA3MjNfMjQ3/MDAxNTYzODU2NTgzOTA0.yWLGnW9KsBmBpA7tS-9eQSlbPUaw8Xc_TssXPsYoJAUg.A3BqkKr1QmJCImy5D1niw7Ut-xKuouGfnIEVvtGox5gg.JPEG.so6428/SE-5c70b95d-e55b-4d03-837d-f58dbf89a561.jpg?type=w800",
  age: 29,
  job: "Photographer",
  introduction: "A photographer based in Seoul.  I know the best photo spots!",
  gender: "MS",
  temperament: "EXTROVERT",
  decisionMaking: "JUDGING",
  wellbeing: ["NOT_SELECTED"],
  activitiesInvestmentTech: ["NOT_SELECTED"],
  careerMajor: ["NOT_SELECTED"],
  entertainment: ["NOT_SELECTED"],
  hobbiesInterests: ["LANGUAGE", "SHOPPING", "TRAVEL"],
  lifestyle: ["NOT_SELECTED"],
  artBeauty: ["NOT_SELECTED"],
  food: ["NOT_SELECTED"],
  sports: ["SWIMMING", "BASEBALL", "BICYCLE"],
  languages: [
    {
      languageType: "English",
      languageLevel: "advanced",
    },
    {
      languageType: "Korean",
      languageLevel: "native speaker",
    },
  ],
  nationality: "Spanish",
  ticketStatus: "Not Submitted",
};

export const KuddyReviewData: ReviewListInfo = {
  reviewCount: 9,
  meetCount: 12,
  reviews: [
    {
      reviewId: 1,
      meetupId: 1,
      content: `Review text here.
    great! awesome! yor are great tour maker!
    I hope to see you again on my next trip!`,
      createdDate: "2099.99.99",
      grade: "perfect",
      writer: {
        memberId: 1,
        nickname: "user name",
        profileImg:
          "https://mblogthumb-phinf.pstatic.net/MjAxOTA3MjNfMjQ3/MDAxNTYzODU2NTgzOTA0.yWLGnW9KsBmBpA7tS-9eQSlbPUaw8Xc_TssXPsYoJAUg.A3BqkKr1QmJCImy5D1niw7Ut-xKuouGfnIEVvtGox5gg.JPEG.so6428/SE-5c70b95d-e55b-4d03-837d-f58dbf89a561.jpg?type=w800",
      },
    },
    {
      reviewId: 2,
      meetupId: 1,
      content: `Review text here.
    great! awesome! yor are great tour maker!
    I hope to see you again on my next trip!`,
      createdDate: "2099.99.99",
      grade: "perfect",
      writer: {
        memberId: 1,
        nickname: "user name",
        profileImg:
          "https://mblogthumb-phinf.pstatic.net/MjAyMTA2MDJfMTM4/MDAxNjIyNjA5MzA1OTk4.8DiTAnBkxket9LiUgrL3mweXGHc-1wyNR1twaf8eM7Yg.MK0x-lU2LYHhLqcHLxg0MN9vZrFbCrUMQbere7MTRUYg.JPEG.seoraestudio/201214.%25EB%25B9%2584%25EB%258B%25A46151.jpg?type=w800",
      },
    },
  ],
};

export const TravelerReviewData: ReviewListInfo = {
  reviewCount: 5,
  meetCount: 12,
  reviews: [
    {
      reviewId: 1,
      meetupId: 1,
      content: `Review text here.
      great! awesome! yor are great tour maker!
      I hope to see you again on my next trip!  Have a good day. Good morning, good evening.Have a good day.`,
      createdDate: "2099.99.99",
      kuddy: {
        memberId: 1,
        nickname: "user name",
        profileImg:
          "https://mblogthumb-phinf.pstatic.net/MjAxOTA3MjNfMjQ3/MDAxNTYzODU2NTgzOTA0.yWLGnW9KsBmBpA7tS-9eQSlbPUaw8Xc_TssXPsYoJAUg.A3BqkKr1QmJCImy5D1niw7Ut-xKuouGfnIEVvtGox5gg.JPEG.so6428/SE-5c70b95d-e55b-4d03-837d-f58dbf89a561.jpg?type=w800",
      },
    },
    {
      reviewId: 2,
      meetupId: 1,
      content: `Review text here.
      great! awesome! yor are great tour maker!
      I hope to see you again on my next trip!  Have a good day. Good morning, good evening.Have a good day.`,
      createdDate: "2099.99.99",
      kuddy: {
        memberId: 1,
        nickname: "user name",
        profileImg:
          "https://mblogthumb-phinf.pstatic.net/MjAxOTA3MjNfMjQ3/MDAxNTYzODU2NTgzOTA0.yWLGnW9KsBmBpA7tS-9eQSlbPUaw8Xc_TssXPsYoJAUg.A3BqkKr1QmJCImy5D1niw7Ut-xKuouGfnIEVvtGox5gg.JPEG.so6428/SE-5c70b95d-e55b-4d03-837d-f58dbf89a561.jpg?type=w800",
      },
    },
  ],
};
