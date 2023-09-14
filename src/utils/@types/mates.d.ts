interface MatesType {
  id: number;
  roleType: string;
  nickname: string;
  introduce: string;
  profileImageUrl: string;
  interests: string[];
}

interface MatesFilterType {
  gender: "MR" | "MS" | "N";
  languageId: number;
  districtId: number;
  firstInterest: string;
  secondInterest: string;
}
