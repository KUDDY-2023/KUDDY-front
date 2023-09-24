import { apiClient } from ".";

// get pick
export const pickGetPick = async () => {
  const url = `/api/v1/hearts/member`;
  return apiClient.get(url);
};

// post pick
export const pickPostPick = async (contentId: number) => {
  const url = `/api/v1/hearts/${contentId}`;
  return apiClient.post(url);
};

// delete pick
export const pickDeletePick = async (contentId: number) => {
  const url = `/api/v1/hearts/${contentId}`;
  return apiClient.delete(url);
};
