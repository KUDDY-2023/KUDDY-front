import "./loginformpage.scss";
import BackNavBar from "@components/_common/backnavbar";
import LoginProgressBar from "@components/authpage/loginProgressBar";

export default function LoginFormPage() {
  return (
    <div className="login-form-page">
      <BackNavBar middleTitle="Join" />
      <LoginProgressBar />
    </div>
  );
}
