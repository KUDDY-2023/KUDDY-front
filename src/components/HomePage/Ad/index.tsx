import "./ad.scss";
import adimage from "@assets/home/ad.png";

const Ad = () => {
  return (
    <div className="ad-wrapper">
      <a
        className="ad-container"
        href="https://www.instagram.com/kuddy_korea"
        target="_blank"
      >
        <img src={adimage} alt="ad" />
        <p>AD</p>
      </a>
    </div>
  );
};

export default Ad;
