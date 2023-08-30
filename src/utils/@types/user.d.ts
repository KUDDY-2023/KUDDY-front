// 프로필 정보 생성
interface IUserProfile {
  roleType: string;
  nickname: string;
  profileImage: string;
  gender: string;
  age: number;
  temperament: string;
  decisionMaking: string;
  job: string;
  wellbeing: string;
  activitiesInvestmentTech: string;
  careerMajor: string;
  entertainment: string;
  hobbiesInterests: string;
  lifestyle: string;
  artBeauty: string;
  food: string;
  sports: string;
  nationality: string;
  availableLanguages: [
    {
      languageType: string;
      languageLevel: number;
    },
    {
      languageType: string;
      languageLevel: number;
    },
  ];
  districts: [
    {
      areaName: string;
    },
    {
      areaName: string;
    },
  ];
}

interface UserProfile {
  type: string;
  nickname: string;
  gender: string;
  age: number;
  profile: File | any; // img는 어케하지 ??
  job: string;
  introvert: boolean;
  judging: boolean;
  language: string[];
  interests: string[];
}

interface KuddyUserProfile extends UserProfile {
  area: number[];
}

interface TravelerUserProfile extends UserProfile {
  nationality: number;
}

// 언어 수준
interface LanguageLevelType {
  language: string;
  level: string;
}
