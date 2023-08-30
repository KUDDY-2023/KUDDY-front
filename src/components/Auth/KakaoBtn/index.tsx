import "./kakaoBtn.scss";
import { ReactComponent as Kakao } from "@assets/auth/kakao.svg";

interface Props {
  onClick: () => void;
}
export default function KakaoBtn({ onClick }: Props) {
  return (
    <div className="kakao-btn" onClick={onClick}>
      <Kakao />
      <p>Login with Kakao</p>
    </div>
  );
}
