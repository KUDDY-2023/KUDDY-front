interface MatesType {
  memberId: number;
  profileId: number;
  role: "KUDDY" | "TRAVELER";
  nickname: string;
  introduce: string;
  profileImage: string;
  kuddyLevel?: string;
  allInterests: string[];
}

interface MatesFilterType {
  gender: "" | "MR" | "MS" | "NEUTRAL";
  languageType: string;
  areaName: string;
  interestGroup:
    | ""
    | "activitiesInvestmentTech"
    | "artBeauty"
    | "careerMajor"
    | "lifestyle"
    | "entertainment"
    | "food"
    | "hobbiesInterests"
    | "sports"
    | "wellbeing";
  interestContent: string;
  nickname: string;
}
