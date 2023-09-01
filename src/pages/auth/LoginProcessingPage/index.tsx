import { useAuthLogin } from "@services/hooks/auth";

export default function LoginProcessingPage() {
  useAuthLogin();

  return (
    <div className="kakao-login-page">
      <h2>로그인 중 ...</h2>
    </div>
  );
}
