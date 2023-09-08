type MenuType = "itinerary-feedback" | "talking-board";

interface SpotType {
  spotId: number;
  spotName: string;
  contentId: number;
  district: string;
  category: string;
  imageUrl: string;
}

interface PostType {
  postId: number;
  title: string;
  content: string;
  writerId: number;
  createdDate: string;
}

interface ItineraryFeedbackPost extends PostType {
  spotList: SpotType[];
}

interface TalkingBoardPost extends PostType {
  filter: string;
  photoList?: string[];
  joinPeople?: number;
  joinDate?: string;
  joinDistrict?: string;
  subject?: string;
}

interface userInfoType {
  nickname: string;
  profile: string;
  hasBadge: boolean;
  isCreator: boolean;
}

interface CommentType {
  userInfo: userInfoType;
  content: string;
  date: string;
  time: string;
  depth: number;
}
