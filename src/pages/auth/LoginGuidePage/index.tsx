import "./loginguidepage.scss";
import Xicon from "@assets/icon/xbtn.svg";
import GoogleBtn from "@components/Auth/GoogleBtn";
import KakaoBtn from "@components/Auth/KakaoBtn";
export default function LoginGuidePage() {
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
        <KakaoBtn />
        <GoogleBtn />
      </div>
    </div>
  );
}
