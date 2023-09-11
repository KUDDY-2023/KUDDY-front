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
  postType: string;
  title: string;
  content: string;
}

interface ItineraryPostType extends PostType {
  spots: number[];
}

interface JoinUsPostType extends PostType {
  people: number;
  date: string;
  district: string;
  images: string[];
}

interface OthersPostType extends PostType {
  subject: string;
  images: string[];
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
