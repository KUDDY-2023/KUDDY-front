import "./loginguidepage.scss";
import Xicon from "@assets/icon/xbtn.svg";
import GoogleBtn from "@components/Auth/GoogleBtn";
import KakaoBtn from "@components/Auth/KakaoBtn";
import { useNavigate } from "react-router-dom";

import { useAuthSocialLogin } from "@services/hooks/auth";

export default function RegisterPage() {
  const onLogin = useAuthSocialLogin();

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
        <KakaoBtn onClick={() => onLogin("kakao")} />
        <GoogleBtn onClick={() => onLogin("google")} />
      </div>
    </div>
  );
}
