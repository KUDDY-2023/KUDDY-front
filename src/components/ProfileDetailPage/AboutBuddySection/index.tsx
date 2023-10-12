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
  isAreaName?: boolean;
};

const AboutBuddyText = ({ iconImage, texts, isAreaName }: TextProps) => {
  return (
    <div className="about-buddy-detail-container">
      <img src={iconImage} />
      <div className="about-buddy-text-container">
        {!isAreaName ? (
          <>
            {texts?.map((text: string, index: number) => {
              return (
                <div key={index} className="about-buddy-text">
                  {text}
                </div>
              );
            })}
          </>
        ) : (
          <div className="about-buddy-text">
            {texts?.map((text: string) => {
              return text + " ";
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const AboutBuddySection = ({ profile }: Props) => {
  const handleLanguageLevel = (level: number) => {
    let languageLevel;

    switch (level) {
      case 1:
        languageLevel = "Beginner";
        break;
      case 2:
        languageLevel = "Intermediate";
        break;
      case 3:
        languageLevel = "Advanced";
        break;
      case 4:
        languageLevel = "Native Speaker";
    }

    return languageLevel;
  };

  const getDecisionMaking = (text: string) => {
    if (text === "Judging") {
      return "Prefer planing";
    } else {
      return "Prefer spontaneous";
    }
  };

  return (
    <div className="about-buddy-section-container">
      <div className="about-buddy-title">About buddy</div>
      <AboutBuddyText
        iconImage={personIcon}
        texts={[
          `${profile?.gender.toLowerCase()}, ${profile?.birthDate}`,
          `${profile?.temperament} & ${getDecisionMaking(
            profile?.decisionMaking,
          )}`,
        ]}
      />
      <AboutBuddyText iconImage={jobIcon} texts={[profile?.job]} />
      <AboutBuddyText
        iconImage={pinIcon}
        texts={
          profile?.role === "KUDDY"
            ? profile?.areas.map((area: any) => area.areaName)
            : [profile?.nationality]
        }
        isAreaName={profile?.role === "KUDDY"}
      />
      <AboutBuddyText
        iconImage={languageIcon}
        texts={profile?.languages?.map(
          (item: AvailableLanguageType) =>
            `${item.languageType} - ${handleLanguageLevel(
              Number(item.languageLevel),
            )}`,
        )}
      />
    </div>
  );
};

export default AboutBuddySection;
