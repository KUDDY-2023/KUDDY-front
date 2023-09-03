import axios from "axios";
import { apiClient } from ".";

// ✅ presigned url 발급 받기
export const imagePresignedUrl = async (imgList: string[]) => {
  const url = `/api/v1/images`;
  return apiClient.post(url, imgList);
};

/*
응답 
{
    "status": 200,
    "message": "SUCCESS",
    "data": [
        {
            "rawFile": "image1.jpg",
            "fileName": "92cea3c1-78ec-4443-8b19-52c60f456a8fimage1.jpg",
            "presignedUrl": "https://kuddy-bucket.s3.ap-northeast-2.amazonaws.com/92cea3c1-78ec-4443-8b19-52c60f456a8fimage1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230827T235016Z&X-Amz-SignedHeaders=host&X-Amz-Expires=119&X-Amz-Credential=AKIAWO35MRV4LOUDVDSM%2F20230827%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=facc3b4a613939371f7d4d8905b1dd70d4c7275ccc0638dbab127e8fb20ad064"
        },
        {
            "rawFile": "image2.png",
            "fileName": "e24ebd1c-1a3e-476a-bb15-15cc933f63dbimage2.png",
            "presignedUrl": "https://kuddy-bucket.s3.ap-northeast-2.amazonaws.com/e24ebd1c-1a3e-476a-bb15-15cc933f63dbimage2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230827T235016Z&X-Amz-SignedHeaders=host&X-Amz-Expires=120&X-Amz-Credential=AKIAWO35MRV4LOUDVDSM%2F20230827%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=71066dd64d10ae71ba70f64714f397df881e99f461318d07398884e9f853ad47"
        },
        {
            "rawFile": "image3.jpg",
            "fileName": "ec8a9a32-ecca-4892-bd41-9212f693ccd9image3.jpg",
            "presignedUrl": "https://kuddy-bucket.s3.ap-northeast-2.amazonaws.com/ec8a9a32-ecca-4892-bd41-9212f693ccd9image3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230827T235016Z&X-Amz-SignedHeaders=host&X-Amz-Expires=119&X-Amz-Credential=AKIAWO35MRV4LOUDVDSM%2F20230827%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=0c63f598d768c3bcaf1e00b88823f68201f48232c60aae222ec1cfd0e37c2374"
        }
    ]
}


이름이 없는 파일 
{
    "status": "BAD_REQUEST",
    "errorCode": "C5001",
    "message": "이미지 파일명은 NULL값을 가질 수 없습니다."
}

확장자 오류
{
    "status": "BAD_REQUEST",
    "errorCode": "C5002",
    "message": "이미지 파일 확장자는 jpg(JPG), png(PNG), jpeg(JPEG)만 가능합니다."
}
*/
