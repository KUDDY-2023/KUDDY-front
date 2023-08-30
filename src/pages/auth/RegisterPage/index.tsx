import "./loginguidepage.scss";
import Xicon from "@assets/icon/xbtn.svg";
import GoogleBtn from "@components/Auth/GoogleBtn";
import KakaoBtn from "@components/Auth/KakaoBtn";
import { useNavigate } from "react-router-dom";
export default function RegisterPage() {
  const navigate = useNavigate();
  //const [cookies, setCookie] = useCookies(["refreshToken"]);

  const CLIENT_MAIN_URL = process.env.REACT_APP_REACT_URL; // 로컬
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY; // api key
  const REDIRECT_URI = `${CLIENT_MAIN_URL}KakaoLogin`; // redirect uri
  const SPRING_URI = "";

  // KAKAO_AUTH_URL
  // 이걸로 바꾸기
  // {{localhost}}/oauth2/authorization/kakao?redirect_uri={REDIRECT_URI}
  const KAKAO_AUTH_URL = `${SPRING_URI}/oauth2/authorization/kakao?redirect_uri=${REDIRECT_URI}`;

  //const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  /** 카카오 로그인 요청  */
  const _handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const GOOGLE_AUTH_URL = `${SPRING_URI}/oauth2/authorization/google?redirect_uri=${REDIRECT_URI}`;

  /** 구글 로그인 요청  */
  const _handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <div className="login-guide-page">
      <div className="navbar-container">
        <img src={Xicon} alt="xicon" />
      </div>
      <div className="profile-container">
        <div className="icon"></div>
        <p>Join KUDDY!</p>
        <p>KUDDY Slogan-catchphrase</p>
      </div>
      <div className="login-btn-container ">
        <KakaoBtn onClick={_handleKakaoLogin} />
        <GoogleBtn onClick={_handleGoogleLogin} />
      </div>
    </div>
  );
}
