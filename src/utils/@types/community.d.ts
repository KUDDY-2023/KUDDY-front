type MenuType = "itinerary-feedback" | "talking-board";

interface SpotType {
  id: number;
  place: string;
  district: string;
  latitude: number;
  longitude: number;
}

interface PhotoType {
  photoId: number;
  src: string;
}

interface PostType {
  postId: number;
  title: string;
  content: string;
  writerName: string;
  writerProfile: string;
  writeDate: string;
  writeTime: string;
  commentCnt: number;
}

interface ItineraryFeedbackPost extends PostType {
  spotList: SpotType[];
}

interface TalkingBoardPost extends PostType {
  filter: string;
  photoList?: PhotoType[];
  joinPeople?: number;
  joinDate?: string;
  joinDistrict?: string;
}
