import { apiClient } from "@services/api";
import { authGetRefreshToken } from "@services/api/auth";
export default function Test() {
  const test = async () => {
    try {
      const res = await authGetRefreshToken();
      console.log(res);
    } catch (err) {
      console.log("토큰 재발급 실패", err);
    }
  };
  return (
    <div>
      테스트 페이지<button onClick={test}>재발급</button>
    </div>
  );
}
