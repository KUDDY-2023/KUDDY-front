import "./about-buddy-section.scss";
import { useState } from "react";
import personIcon from "@assets/profile/person.svg";
import jobIcon from "@assets/profile/job.svg";
import pinIcon from "@assets/icon/pin_default.svg";
import languageIcon from "@assets/profile/language.svg";

const AboutBuddySection = ({ ...props }) => {
  const [buddyInfo, setBuddyInfo] = useState([
    {
      id: 1,
      src: personIcon,
      texts: [
        `${props.gender}, ${props.age}`,
        `${props.personality.temperament} & ${props.personality.decisionMaking}`,
      ],
    },
    { id: 2, src: jobIcon, texts: [props.job] },
    {
      id: 3,
      src: pinIcon,
      texts:
        props.role === "kuddy" ? [props.activeRegion] : [props.nationality],
    },
    {
      id: 4,
      src: languageIcon,
      texts: props.languages.map(
        (item: LanguageInfo) => `${item.languageType} - ${item.languageLevel}`,
      ),
    },
  ]);

  return (
    <div className="about-buddy-section-container">
      <div className="about-buddy-title">About buddy</div>
      {buddyInfo.map(item => {
        return (
          <div key={item.id} className="about-buddy-detail-container">
            <img src={item.src} />
            <div className="about-buddy-text-container">
              {item.texts?.map((text: string, index: number) => {
                return (
                  <div key={index} className="about-buddy-text">
                    {text}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AboutBuddySection;
