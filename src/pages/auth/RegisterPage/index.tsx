import "./loginguidepage.scss";
import { ReactComponent as Xicon } from "@assets/icon/xbtn.svg";
import { ReactComponent as LogoProfile } from "@assets/logo/login_profile.svg";
import GoogleBtn from "@components/Auth/GoogleBtn";
import KakaoBtn from "@components/Auth/KakaoBtn";
import { useNavigate } from "react-router-dom";

import { useAuthSocialLogin } from "@services/hooks/auth";

export default function RegisterPage() {
  const onLogin = useAuthSocialLogin();

  return (
    <div className="login-guide-page">
      <div className="navbar-container">
        <Xicon />
      </div>
      <div className="profile-container">
        <LogoProfile />
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
