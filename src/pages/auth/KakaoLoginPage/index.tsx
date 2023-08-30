import { useNavigate, useLocation } from "react-router-dom";

export default function KakaoLoginPage() {
  const location = useLocation();
  const KAKAO_CODE = location.search.split("accessToken=")[1]; // access token 얻기

  // access token 저장 과정

  return (
    <div className="kakao-login-page">
      <h2>카카오 로그인 중</h2>
    </div>
  );
}
