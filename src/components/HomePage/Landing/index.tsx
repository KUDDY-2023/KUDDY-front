import "./landing.scss";
import logoimg from "@assets/home/logo.png";

const Landing = () => {
  return (
    <div className="landing-wrapper">
      <div className="flex">
        <img src={logoimg} />
        <p>KUDDY</p>
      </div>
    </div>
  );
};

export default Landing;
