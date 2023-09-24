interface KuddysPickPreviewContentType {
  contentId: number;
  imageUrl: string;
  name: string;
  summary: string;
}

interface KuddysPickPreviewType {
  id: number;
  thumbnail: string;
  title: string;
  content: string;
  pickSpotList: KuddysPickPreviewContentType[];
}

interface KuddysPickType {
  id: number;
  thumbnail: string;
  title: string;
}

interface KuddysPickDetailContentType {
  contentId: number;
  name: string;
  district: string;
  category: string;
  imageUrl: string;
  detail: string;
  pickImageList: string[];
}

interface KuddysPickDetailType {
  id: number;
  thumbnail: string;
  title: string;
  content: string;
  pickSpotList: KuddysPickDetailContentType[];
}
