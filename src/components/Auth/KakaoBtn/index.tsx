import "./kakaoBtn.scss";
import { ReactComponent as Kakao } from "@assets/auth/kakao.svg";

export default function KakaoBtn() {
  return (
    <div className="kakao-btn">
      <Kakao />
      <p>Login with Kakao</p>
    </div>
  );
}
