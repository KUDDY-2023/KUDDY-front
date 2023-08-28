import "./loginguidepage.scss";
import Xicon from "@assets/icon/xicon.png";
import GoogleBtn from "@components/authpage/GoogleBtn";
import KakaoBtn from "@components/authpage/KakaoBtn";
export default function LoginGuidePage() {
  return (
    <div>
      <div className="navbar-container">
        <img src={Xicon} alt="xicon" />
      </div>
      <div className="profile-container">
        <div></div>
        <p>Join KUDDY!</p>
        <p>KUDDY Slogan-catchphrase</p>
      </div>
      <div className="btn-container">
        <KakaoBtn />
        <GoogleBtn />
      </div>
    </div>
  );
}
