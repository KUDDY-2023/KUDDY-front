import "./logindonepage.scss";
import { ReactComponent as WelcomeLogo } from "@assets/logo/welcome.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function LoginDonePage() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }, []);
  return (
    <div className="login-done-page">
      <WelcomeLogo />
    </div>
  );
}
