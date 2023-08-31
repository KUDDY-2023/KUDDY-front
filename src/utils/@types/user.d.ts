type UserType = "KUDDY" | "TRAVELER";
type GenderType = "MR" | "MS" | "N"; // 중성은 뭐지..?
type TemperamentType = "INTROVERT" | "EXTROVERT";
type DicisionMakingType = "JUDGING" | "PROSPECTING";
type AvailableLanguageType = { languageType: string; languageLevel: number };
type DistrictType = { areaName: string }; // 지역 타입 정해야할까..

/*
이거 정해진거임? - 선택 안하면 안 넣어도 되나? 
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
