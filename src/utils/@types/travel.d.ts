interface TravelPreviewType {
  contentId: number;
  name: string;
  district: string;
  imageUrl: string;
  category: string;
}

interface TravelDetailType {
  id: number;
  name: string;
  district: string;
  imageList: string[];
  category: string;
  about: string;
  phoneNum: string;
  homepage: string;
  location: string;
  post: string;
  nearbyPlace: TravePreviewType[];
}

interface PickedMatesType {
  id: number;
  type: string;
  nickname: string;
  profileImg: string;
  introduce: string;
}
