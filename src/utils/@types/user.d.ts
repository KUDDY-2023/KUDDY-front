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
