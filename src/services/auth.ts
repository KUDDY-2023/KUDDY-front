import axios from "axios";
import { apiClient } from ".";

// 여행객, 가이드 둘 따로임 !
// 🔥 오류 관리 어떻게 할지? => hook 안에서 따로 해야할 듯
export const CreateUserProfile = (name: IUserProfile) => {
  const url = `/api/v1/members/profile`;
  return apiClient.post(url, name).then(res => {
    return res.data;
  });
};
