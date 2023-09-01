interface LanguageInfo {
  languageType: string;
  languageLevel: string;
}

interface UserInfo {
  memberId: number;
  role: "kuddy" | "traveler";
  nickname: string;
  profileImage: string;
  age: number;
  introduction: string; // 소개글
  job: string;
  gender: "Mr" | "Ms" | "Neutral";
  personality: {
    temperament: "Extrovert" | "Introvert";
    decisionMaking: "Judging" | "Prospecting";
  };
  interest?: {
    wellbeing?: string[];
    activitiesInvestmentTech?: string[];
    careerMajor?: string[];
    entertainment?: string[];
    hobbiesInterests?: string[];
    lifestyle?: string[];
    food?: string[];
    sports?: string[];
  };
  languages: LanguageInfo[];
}

interface KuddyUserInfo extends UserInfo {
  guidGrade: string;
  activeRegion: string;
  certificate?: string;
}

interface TravelerUserInfo extends UserInfo {
  nationality: string;
  ticketStatus: "Submitted" | "Not Submitted";
}

interface ReviewType {
  reviewId: number;
  content: string;
  createdAt: string;
}

interface KuddyReviewType extends ReviewType {
  grade: "perfect" | "good" | "disappoint";
  writer: {
    name: string;
    profileImg: string;
  };
}

interface TravelerReviewType extends ReviewType {
  kuddy: {
    name: string;
    profileImg: string;
  };
}

interface ReviewListInfo {
  reviewCount: number;
  meetCount: number;
}

interface KuddyReviewListInfo extends ReviewListInfo {
  reviews: KuddyReviewType[];
}

interface TravelerReviewListInfo extends ReviewListInfo {
  reviews: TravelerReviewType[];
}
