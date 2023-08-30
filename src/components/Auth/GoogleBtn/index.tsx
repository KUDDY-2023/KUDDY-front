import { ReactComponent as Google } from "@assets/auth/google.svg";

import "./googleBtn.scss";
export default function GoogleBtn() {
  return (
    <div className="google-btn">
      <Google />
      <p>Login with Google</p>
    </div>
  );
}
