import { apiClient } from ".";

// trending now
export const spotGetTrendingNow = async () => {
  const url = `/api/v1/spots/trend`;
  return apiClient.get(url);
};

// category

// district

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

// all
export const spotGetAll = async (page: number, size: number) => {
  const url = `/api/v1/spots/all?page=${page}&size=${size}`;
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
