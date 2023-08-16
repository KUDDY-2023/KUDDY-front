import "./loginguidepage.scss";
import Xicon from "@assets/icon/xicon.png";
import google from "@assets/auth/google.png";

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
        <div className="btn">
          <img src={google} alt="google" />
          <p>Login with Google</p>
        </div>
        <div className="btn">
          <img src={google} alt="google" />
          <p>Login with Google</p>
        </div>
      </div>
    </div>
  );
}
