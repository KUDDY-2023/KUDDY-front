import "./about-buddy-section.scss";
import { useEffect, useState } from "react";
import personIcon from "@assets/profile/person.svg";
import jobIcon from "@assets/profile/job.svg";
import pinIcon from "@assets/icon/pin_default.svg";
import languageIcon from "@assets/profile/language.svg";

type Props = {
  profile: any;
};

type TextProps = {
  iconImage: string;
  texts: string[];
};

const AboutBuddyText = ({ iconImage, texts }: TextProps) => {
  return (
    <div className="about-buddy-detail-container">
      <img src={iconImage} />
      <div className="about-buddy-text-container">
        {texts?.map((text: string, index: number) => {
          return (
            <div key={index} className="about-buddy-text">
              {text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const AboutBuddySection = ({ profile }: Props) => {
  const handleLanguageLevel = (level: number) => {
    switch (level) {
      case 1:
        return;
    }
  };

  return (
    <div className="about-buddy-section-container">
      <div className="about-buddy-title">About buddy</div>
      <AboutBuddyText
        iconImage={personIcon}
        texts={[
          `${profile?.gender.toLowerCase()}, ${profile?.age}`,
          `${profile?.temperament} & ${profile?.decisionMaking}`,
        ]}
      />
      <AboutBuddyText iconImage={jobIcon} texts={[profile?.job]} />
      <AboutBuddyText
        iconImage={pinIcon}
        texts={
          profile?.role === "KUDDY"
            ? [profile?.areas[0]?.areaName]
            : [profile?.nationality]
        }
      />
      <AboutBuddyText
        iconImage={languageIcon}
        texts={profile?.languages?.map(
          (item: AvailableLanguageType) =>
            `${item.languageType} - ${item.languageLevel}`,
        )}
      />
    </div>
  );
};

export default AboutBuddySection;
