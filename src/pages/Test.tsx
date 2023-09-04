import { apiClient } from "@services/api";
import { test } from "@services/api/auth";

export default function Test() {
  const a = process.env.REACT_APP_REACT_URL;
  const b = process.env.REACT_APP_REST_KAKAO_API_KEY;
  const c = process.env.REACT_APP_API_HOST;

  console.log(a,b,c)
  return <div>테스트 페이지</div>;
}
