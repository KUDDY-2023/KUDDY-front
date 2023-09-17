import { apiClient } from ".";

// trending now
export const spotGetTrendingNow = async () => {
  const url = `/api/v1/spots/trend`;
  return apiClient.get(url);
};

// near my location
export const spotGetNearLocation = async (
  page: number,
  x: number,
  y: number,
) => {
  const url = `/api/v1/spots/recommendation?page=${page}&x=${x}&y=${y}`;
  return apiClient.get(url);
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

// multi filter
export const spotGetByFilter = async (
  page: number,
  size: number,
  filter: SpotGetByFilterType,
) => {
  const url = `/api/v1/spots/search?page=${page}&size=${size}`;
  return apiClient.post(url, filter);
};

// only keyword
export const spotGetOnlyKeyWord = async (keyword: string) => {
  // page: number, size: number
  let page = 1;
  let size = 20;
  const url = `/api/v1/spots/search?page=${page}&size=${size}`;
  return apiClient.post(url, { keyword: keyword, category: "", district: [] });
};
