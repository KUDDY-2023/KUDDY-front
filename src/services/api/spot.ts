import { apiClient } from ".";

/**
 * 장소와 관련된 api
 * api 함수 이름 규칙 : spot + 동사(method) + 목적어
 * 단순히 res.data만을 리턴
 * 그 외 복잡한 로직은 hooks에서 처리
 */

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

// keyword
