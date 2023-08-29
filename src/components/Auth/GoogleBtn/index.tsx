import google from "@assets/auth/google.png";
import "./googleBtn.scss";
export default function GoogleBtn() {
  return (
    <div className="google-btn">
      <img src={google} alt="google" />
      <p>Login with Google</p>
    </div>
  );
}
