interface TravelPreviewType {
  contentId: number;
  name: string;
  district: string;
  imageUrl: string;
  category: string;
}

interface TravelNearbyType extends TravelPreviewType {
  mapX?: string;
  mapY?: string;
}

interface TravelDetailType {
  contentId: number;
  name: string;
  district: string;
  imageList: string[];
  category: string;
  heart: number;
  about: string;
  phoneNum: string;
  homepage: string;
  location: string;
  post: string;
  nearbyPlace: TravelNearbyType[];
  kuddyList: PickedMatesType[];
  travelerList: PickedMatesType[];
  additionalInfo: any;
  mapX: number;
  mapY: number;
}

interface PickedMatesType {
  memberId: number;
  nickname: string;
  profileImageUrl: string;
  email: string;
  introduce?: string;
}

interface SpotGetByFilterType {
  keyword: string;
  category: string;
  district: string[];
}

interface TravelPageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

interface Position {
  x: number;
  y: number;
}
