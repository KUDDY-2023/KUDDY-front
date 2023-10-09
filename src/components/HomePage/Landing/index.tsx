import "./landing.scss";
import logoimg from "@assets/home/logo.png";
import { ReactComponent as LandingText } from "@assets/home/landing_text.svg";

const Landing = () => {
  return (
    <div className="landing-wrapper">
      <div className="flex">
        <img src={logoimg} />
        <LandingText className="text" />
      </div>
    </div>
  );
};

export default Landing;
