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
  grade: "perfect" | "good" | "disappoint";
  createdAt: string;
}

interface KuddyReviewType extends ReviewType {
  writerId: number;
}

interface TravelerReviewType extends ReviewType {
  kuddyId: number;
}

interface ReviewListInfo {
  count: number;
}

interface KuddyReviewListInfo extends ReviewListInfo {
  reviews: KuddyReviewType[];
  perfect: number;
  good: number;
  disappoint: number;
}

interface TravelerReviewListInfo extends ReviewListInfo {
  reviews: TravelerReviewType[];
}
