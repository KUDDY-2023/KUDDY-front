import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { imagePresignedUrl, imageUploadImg } from "@services/api/image";

// ✅ presigned Url 발급 hook
export const useGetPresignedUrl = () => {
  const onGetUrl = async (imgList: string[]) => {
    try {
      const res = await imagePresignedUrl(imgList);
      console.log(res);
      const urlList = res.data.data.map((i: any) => i.presignedUrl);
      return urlList as string[];
    } catch (err) {
      console.log(err);
    }
  };

  return onGetUrl;
};

// ✅ 하나의 url로 이미지 업로드하는 hook
export const usePostImage = () => {
  const onPostImage = async (presignedUrl: string, uploadFile: File) => {
    try {
      const res = await imageUploadImg(presignedUrl, uploadFile);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  return onPostImage;
};
