import { apiClient } from ".";

// mates list
export const matesGetList = async (
  matetype: string,
  page: number,
  size: number,
) => {
  const url = `/api/v1/mate/${matetype}?page=${page}&size=${size}&sort=joinCount,DESC`;
  return apiClient.get(url);
};

// mates search
export const matesPostSearch = async (
  matetype: string,
  filter: MatesFilterType,
) => {
  const url = `/api/v1/mate/${matetype}`;
  return apiClient.post(url, filter);
};
