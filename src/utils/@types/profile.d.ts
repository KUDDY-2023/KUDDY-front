type UserType = "KUDDY" | "TRAVELER";
type GenderType = "MR" | "MS" | "N"; // 중성은 뭐지..?
type TemperamentType = "INTROVERT" | "EXTROVERT";
type DicisionMakingType = "JUDGING" | "PROSPECTING";
type AvailableLanguageType = { languageType: string; languageLevel: string };
type DistrictType = { areaName: string };

// 관심사 타입
interface InterestType {
  [key: string]: any;
  wellbeing: wellbeingType[];
  activitiesInvestmentTech: activitiesInvestmentTechType[];
  careerMajor: careerMajorType[];
  entertainment: entertainmentType[];
  hobbiesInterests: hobbiesInterestsType[];
  lifestyle: lifestyleType[];
  artBeauty: artBeautyType[];
  food: foodType[];
  sports: sportsType[];
}

// 프로필 기본 정보 + 관심사
interface IUserProfile {
  job: string;
  roleType: UserType;
  nickname: string;
  age: number; // 음수는 걸러야되는데 ?
  profileImageUrl: string;
  genderType: GenderType;
  decisionMaking: DicisionMakingType;
  temperament: TemperamentType;
  districts: DistrictType[];
  availableLanguages: AvailableLanguageType[];
  nationality: string;
}

interface UserInfo extends InterestType {
  memberId: number;
  role: UserType;
  nickname: string;
  profileImage: string;
  age: number;
  temperament: TemperamentType;
  decisionMaking: DicisionMakingType;
  gender: GenderType;
  job: string; // 추가 필요
  introduction: string; // 추가 필요
  languages: LanguageInfo[];
  guideGrade?: string;
  activeRegion?: string;
  certificate?: string;
  nationality?: string;
  ticketStatus?: "Submitted" | "Not Submitted";
}

interface ReviewType {
  reviewId: number;
  meetupId: number;
  content: string;
  createdDate: string;
}

interface KuddyReviewType extends ReviewType {
  grade: "perfect" | "good" | "disappoint";
  writer: {
    memberId: number;
    nickname: string;
    profileImg: string;
  };
}

interface TravelerReviewType extends ReviewType {
  kuddy: {
    memberId: number;
    nickname: string;
    profileImg: string;
  };
}

interface ReviewListInfo {
  reviewCount: number;
  meetCount: number;
  reviews: KuddyReviewType[] | TravelerReviewType[];
}
