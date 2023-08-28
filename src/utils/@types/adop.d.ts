interface Adopt {
  id?: number;
  title: string;
  address: string;
  bookmark: number;
  chat: number;
  publishedAt: number;
  thumbnail: string;
  species: string;
  status: number;
}

interface AdoptCoords {
  latitude: number;
  longitude: number;
  address: string;
}

interface AdoptHeader {
  title: string;
  status: number;
  publishedAt: number;
}

interface AdoptMetadata {
  gender: string;
  age: string;
  name: string;
  species: string;
}

interface AdoptContext {
  context: string;
  bookmark: number;
  chat: number;
}

interface AdoptAuthor {
  id: number;
  username: string;
  profile: string;
  address: string;
}

interface AdoptDetail {
  id: number;
  imageList: ImageUploadResponse2[];
  coords: AdoptCoords;
  header: AdoptHeader;
  metadata: AdoptMetadata;
  context: AdoptContext;
  author: AdoptAuthor;
  mine: boolean;
}

type AdoptPostBodyKey =
  | 'title'
  | 'content'
  | 'kind'
  | 'name'
  | 'gender'
  | 'age'
  | 'species'
  | 'latitude'
  | 'longitude'
  | 'address'
  | 'image';
