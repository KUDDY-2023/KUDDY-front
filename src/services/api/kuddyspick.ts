import { apiClient } from ".";

// get all list
export const kuddyspickGetAllList = async () => {
  const url = `/api/v1/picks`;
  return apiClient.get(url);
};

// get list by title
export const kuddyspickGetByTitle = async (title: string) => {
  const url = `/api/v1/picks/search?title=${title}`;
  return apiClient.get(url);
};

// get detail
export const kuddyspickGetDetail = async (id: number) => {
  const url = `/api/v1/picks/${id}`;
  return apiClient.get(url);
};

// get home page 8 swiper card list
export const kuddyspickGetSwiperCard = async () => {
  const url = `/api/v1/picks/thumbnail`;
  return apiClient.get(url);
};

// get home page 3 preview
export const kuddyspickGetPreview = async () => {
  const url = `/api/v1/picks/random`;
  return apiClient.get(url);
};
