type UserType = "KUDDY" | "TRAVELER";
type GenderType = "MR" | "MS" | "N"; // 중성은 뭐지..?
type TemperamentType = "INTROVERT" | "EXTROVERT";
type DicisionMakingType = "JUDGING" | "PROSPECTING";
type AvailableLanguageType = { languageType: string; languageLevel: string };
type DistrictType = { areaName: string };

// 관심사 타입
interface InterestType {
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
interface IUserProfile extends InterestType {
  roleType: UserType;
  nickname: string;
  profileImage: string;
  gender: GenderType;
  age: number; // 음수는 걸러야되는데 ?
  temperament: TemperamentType;
  decisionMaking: DicisionMakingType;
  job: string;
  nationality: string;
  availableLanguages: AvailableLanguageType[];
  districts: DistrictType[];
}
