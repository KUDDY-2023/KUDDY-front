type UserType = "KUDDY" | "TRAVELER";
type GenderType = "MR" | "MS" | "N"; // 중성은 뭐지..?
type TemperamentType = "INTROVERT" | "EXTROVERT";
type DicisionMakingType = "JUDGING" | "PROSPECTING";
type AvailableLanguageType = { languageType: string; languageLevel: string };
type DistrictType = { areaName: string };

/*
이거 어찌할지 결정해 


wellbeing: "HEALTH";
  activitiesInvestmentTech: "STOCK";
  careerMajor: "STUDY";
  entertainment: "STARTUP";
  hobbiesInterests: "SHOPPING";
  lifestyle: "LIGHTHEARTED";
  artBeauty: "MUSIC";
  food: "SALAD";
  sports: "DANCE";
*/

// 프로필 정보 생성
interface IUserProfile {
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
