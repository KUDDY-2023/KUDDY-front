import { apiClient } from ".";

/**
 * 장소와 관련된 api
 * api 함수 이름 규칙 : spot + 동사(method) + 목적어
 * 단순히 res.data만을 리턴
 * 그 외 복잡한 로직은 hooks에서 처리
 */

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
