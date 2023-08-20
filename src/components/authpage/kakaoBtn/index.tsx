import "./kakaoBtn.scss";
import kakao from "@assets/auth/kakao.png";
export default function KakaoBtn() {
  return (
    <div className="kakao-btn">
      <img src={kakao} alt="kakao" />
      <p>Login with Kakao</p>
    </div>
  );
}
