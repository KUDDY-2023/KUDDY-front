import { useNavigate, useLocation } from "react-router-dom";

export default function GoogleLoginPage() {
  const location = useLocation();
  const GOOGLE_CODE = location.search.split("accessToken=")[1]; // access token 얻기

  // access token 저장 과정

  return (
    <div className="google-login-page">
      <h2>구글 로그인 중</h2>
    </div>
  );
}
