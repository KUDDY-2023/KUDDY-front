import axios from "axios";
import { apiClient } from ".";

// ✅ presigned url 발급 받기
export const imagePresignedUrl = async (imgList: string[]) => {
  const url = `/api/v1/posts/images`;
  return apiClient.post(url, { imgList: imgList });
};

// ✅ 이미지 업로드
export const imageUploadImg = async (
  presignedUrl: string,
  uploadFile: File,
) => {
  const headers = { "Content-Type": "image/*" };
  return axios.put(presignedUrl, uploadFile, { headers });
};
