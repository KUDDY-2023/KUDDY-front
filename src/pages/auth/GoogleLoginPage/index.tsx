import { useAuthLogin } from "@services/hooks/auth";

export default function GoogleLoginPage() {
  useAuthLogin();
  return (
    <div className="google-login-page">
      <h2>구글 로그인 중</h2>
    </div>
  );
}
