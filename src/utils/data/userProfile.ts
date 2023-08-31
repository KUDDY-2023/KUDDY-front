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
export const KuddyUserData: KuddyUserInfo = {
  memberId: 1,
  role: "kuddy",
  nickname: "ian",
  profileImage:
    "https://s3-alpha-sig.figma.com/img/fbb8/d9ac/1ce502fe13469a7dc64838483c74591e?Expires=1693785600&Signature=OpDoQijvXdgFWa3GfuIaZ3sSZszsYfF4vlAgAoTtac34kdCxF6CQ-ft0MRUJdbnEecuxrEKyINTqcyDIstN2Ljz51yWeDCtVzySJff~d2~Mg4PJFKqtkiOidpOctfSIMHBePgdrE11kAFgMazzo-DHeW5hP7G-ot~1JIIINyPjTdtik2ZnzIMdPvLQWr2g0SIQs27rJcb-mjj3qnNfBCLpK~SeO0A8wehpKyUNavdapm9mKsIyL-T7w~ivdvAo0tcHNDPX4K3yA8AJEprjRzjwUbSk7y04Y-8Vjg6-cts9uAPZoViIjDkGqLwJV59n0eVqECruApKa1tW-bT5BTmSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  age: 29,
  job: "Photographer",
  introduction: "A photographer based in Seoul.  I know the best photo spots!",
  gender: "Ms",
  personality: {
    temperament: "Extrovert",
    decisionMaking: "Judging",
  },
  interest: {
    hobbiesInterests: ["Photo", "Polaroid", "Walk"],
  },
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
  guidGrade: "guide grade",
  activeRegion: "Seodaemun Songpa",
};

export const TravelerUserData: TravelerUserInfo = {
  memberId: 2,
  role: "traveler",
  nickname: "harper",
  profileImage:
    "https://s3-alpha-sig.figma.com/img/f408/2883/2744c00e820f277563889c3bca4f7fd4?Expires=1693180800&Signature=KJKOOycrDTihH3s5KUHao-i48T18aIDiEb-f0UWQ-kQxqZLNgy2O4PGIihGP7byvFcwUtqGtVjN5pqUR8X9RniZoNKRQpawWeeny-LfugqmaDsMcZSzoC0r~YczXF~yD8cXuaYiWWJT3qKoP8htSywQLxl~aVntIpGjqqsfPOrFyHnL~dHm2nB2G0vqeRO~7z405VVCZwKo7fpQZCYWhfHue3yn2i7WpO9HZ0YEu2girAkyaTd5hZaLkCOWJHgj-YND4xj41SekwyWOOTkE35lXgyMn~JD6-wgma7eSp6d4LRnrzUuQJFj91wy4TQo7aEDCE2R1UZtvYmaf-nXvYrQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  age: 29,
  job: "Photographer",
  introduction: "A photographer based in Seoul.  I know the best photo spots!",
  gender: "Ms",
  personality: {
    temperament: "Extrovert",
    decisionMaking: "Judging",
  },
  interest: {
    hobbiesInterests: ["Photo", "Fashion", "Running"],
    sports: ["Basketball", "Baseball"],
  },
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

export const KuddyReviewData: KuddyReviewListInfo = {
  reviewCount: 9,
  meetCount: 12,
  reviews: [
    {
      reviewId: 1,
      content: `Review text here.
    great! awesome! yor are great tour maker!
    I hope to see you again on my next trip!`,
      createdAt: "2099.99.99",
      grade: "perfect",
      writer: {
        name: "user name",
        profileImg:
          "https://s3-alpha-sig.figma.com/img/26ed/3c74/5b209583feb572746ffd38d141b5cd12?Expires=1694390400&Signature=CiOFj~fEHRsEETPuJsN22hUxhGPFaw1jcfqdv5DByh7KnGGET~aeHe5N6ISJFHs~rrsQ~E9FUFDUw8Vqqlac2o~JsvQHuFmK4T~vhz4qSfyrZXkEDnOuP4WhMJa55tuC07GYg4uDDoPlAXkMohTSlgISkHi-ejnjLYEjIOZAZgt0Oo6qVB3CA1FR3Xu98jiHqGr0lWUN2g0ToUuyec0ju2kKR2ChjmdfVDC9YW25I7j437mH3Hu61EJWnzYqVH4j5OkXgxqrBup4tUDIlV1Kn27uL6NXqeN8sW0ukdoqpBtOG2ZFWN4BZsbgL5foK1fTL4ralBRar505yNiNTMIZLg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      },
    },
    {
      reviewId: 2,
      content: `Review text here.
    great! awesome! yor are great tour maker!
    I hope to see you again on my next trip!`,
      createdAt: "2099.99.99",
      grade: "perfect",
      writer: {
        name: "user name",
        profileImg:
          "https://s3-alpha-sig.figma.com/img/26ed/3c74/5b209583feb572746ffd38d141b5cd12?Expires=1694390400&Signature=CiOFj~fEHRsEETPuJsN22hUxhGPFaw1jcfqdv5DByh7KnGGET~aeHe5N6ISJFHs~rrsQ~E9FUFDUw8Vqqlac2o~JsvQHuFmK4T~vhz4qSfyrZXkEDnOuP4WhMJa55tuC07GYg4uDDoPlAXkMohTSlgISkHi-ejnjLYEjIOZAZgt0Oo6qVB3CA1FR3Xu98jiHqGr0lWUN2g0ToUuyec0ju2kKR2ChjmdfVDC9YW25I7j437mH3Hu61EJWnzYqVH4j5OkXgxqrBup4tUDIlV1Kn27uL6NXqeN8sW0ukdoqpBtOG2ZFWN4BZsbgL5foK1fTL4ralBRar505yNiNTMIZLg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      },
    },
  ],
};

export const TravelerReviewData: TravelerReviewListInfo = {
  reviewCount: 5,
  meetCount: 12,
  reviews: [
    {
      reviewId: 1,
      content: `Review text here.
      great! awesome! yor are great tour maker!
      I hope to see you again on my next trip!  Have a good day. Good morning, good evening.Have a good day.`,
      createdAt: "2099.99.99",
      kuddy: {
        name: "user name",
        profileImg:
          "https://s3-alpha-sig.figma.com/img/26ed/3c74/5b209583feb572746ffd38d141b5cd12?Expires=1694390400&Signature=CiOFj~fEHRsEETPuJsN22hUxhGPFaw1jcfqdv5DByh7KnGGET~aeHe5N6ISJFHs~rrsQ~E9FUFDUw8Vqqlac2o~JsvQHuFmK4T~vhz4qSfyrZXkEDnOuP4WhMJa55tuC07GYg4uDDoPlAXkMohTSlgISkHi-ejnjLYEjIOZAZgt0Oo6qVB3CA1FR3Xu98jiHqGr0lWUN2g0ToUuyec0ju2kKR2ChjmdfVDC9YW25I7j437mH3Hu61EJWnzYqVH4j5OkXgxqrBup4tUDIlV1Kn27uL6NXqeN8sW0ukdoqpBtOG2ZFWN4BZsbgL5foK1fTL4ralBRar505yNiNTMIZLg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      },
    },
    {
      reviewId: 2,
      content: `Review text here.
      great! awesome! yor are great tour maker!
      I hope to see you again on my next trip!  Have a good day. Good morning, good evening.Have a good day.`,
      createdAt: "2099.99.99",
      kuddy: {
        name: "user name",
        profileImg:
          "https://s3-alpha-sig.figma.com/img/26ed/3c74/5b209583feb572746ffd38d141b5cd12?Expires=1694390400&Signature=CiOFj~fEHRsEETPuJsN22hUxhGPFaw1jcfqdv5DByh7KnGGET~aeHe5N6ISJFHs~rrsQ~E9FUFDUw8Vqqlac2o~JsvQHuFmK4T~vhz4qSfyrZXkEDnOuP4WhMJa55tuC07GYg4uDDoPlAXkMohTSlgISkHi-ejnjLYEjIOZAZgt0Oo6qVB3CA1FR3Xu98jiHqGr0lWUN2g0ToUuyec0ju2kKR2ChjmdfVDC9YW25I7j437mH3Hu61EJWnzYqVH4j5OkXgxqrBup4tUDIlV1Kn27uL6NXqeN8sW0ukdoqpBtOG2ZFWN4BZsbgL5foK1fTL4ralBRar505yNiNTMIZLg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      },
    },
  ],
};
