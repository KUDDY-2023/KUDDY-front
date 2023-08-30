import { useAuthLogin } from "@lib/hooks/auth";

export default function KakaoLoginPage() {
  useAuthLogin();

  return (
    <div className="kakao-login-page">
      <h2>카카오 로그인 중</h2>
    </div>
  );
}
