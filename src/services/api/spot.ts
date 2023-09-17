import { apiClient } from ".";

// trending now
export const spotGetTrendingNow = async () => {
  const url = `/api/v1/spots/trend`;
  return apiClient.get(url);
};

// near my location (infinite scroll)
type SpotGetNearLocationType = {
  page: number;
  pos: Position;
};
export const spotGetNearLocation = async ({
  page,
  pos,
}: SpotGetNearLocationType) => {
  const url = `/api/v1/spots/recommendation?page=${page}&x=${pos.x}&y=${pos.y}`;
  return apiClient.get(url);
};

// multi filter (infinite scroll)
type SpotGetByFilterParamType = {
  page: number;
  size: number;
  filter: SpotGetByFilterType;
};
export const spotGetByFilter = async ({
  page,
  size,
  filter,
}: SpotGetByFilterParamType) => {
  const url = `/api/v1/spots/search?page=${page}&size=${size}`;
  return apiClient.post(url, filter);
};

// spot detail info
export const spotGetDetailInfo = async (contentId: number) => {
  const url = `/api/v1/spots/${contentId}`;
  return apiClient.get(url);
};

// spot detail nearby
export const spotGetDetailNearby = async (
  contentId: number,
  x: number,
  y: number,
) => {
  const url = `/api/v1/spots/recommendation/${contentId}?x=${x}&y=${y}`;
  return apiClient.get(url);
};

// only keyword
export const spotGetOnlyKeyWord = async (keyword: string) => {
  // page: number, size: number
  let page = 1;
  let size = 20;
  const url = `/api/v1/spots/search?page=${page}&size=${size}`;
  return apiClient.post(url, { keyword: keyword, category: "", district: [] });
};
