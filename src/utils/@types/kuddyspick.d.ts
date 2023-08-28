interface KuddysPickPreviewContentType {
  id: number;
  thumbnail: string;
  name: string;
  description: string;
}

interface KuddysPickPreviewType {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  contents: KuddysPickPreviewContentType[];
}

interface KuddysPickType {
  id: number;
  thumbnail: string;
  title: string;
}

interface KuddysPickDetailContentType {
  id: number;
  travel: {
    id: number;
    name: string;
    district: string;
    category: string;
    thumbnail: string;
  };
  description: string;
  image: string[];
}

interface KuddysPickDetailType {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  contents: KuddysPickDetailContentType[];
}
