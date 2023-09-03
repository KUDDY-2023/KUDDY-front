import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { imagePresignedUrl } from "@services/api/image";

// ✅ presigned Url 발급 hook
export const useGetPresignedUrl = () => {
  const onGetUrl = async (imgList: string[]) => {
    try {
      const urlList = await imagePresignedUrl(imgList);
      return urlList;
    } catch (err) {
      console.log(err);
    }
  };

  return onGetUrl;
};
