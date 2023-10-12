import "./travel-detail-section.scss";
import TravelBlock from "@components/Travel/TravelBlock";
import TravelDetailAddInfo from "@components/Travel/TravelDetailAddInfo";
import { ReactComponent as ArrowIcon } from "@assets/icon/arrow_down.svg";
import { useState, useEffect } from "react";

type TravelDetailSectionProps = {
  isToggle?: boolean | undefined;
  isTop?: boolean | undefined;
  title: string;
  content: string | any;
  post?: string;
  name?: string;
  mapXY?: string;
  placeArray?: TravelNearbyType[];
  category?: string;
};

// location kakaomap navigate
const TravelDetailSection = ({
  isToggle,
  isTop,
  title,
  content,
  post,
  name,
  mapXY,
  placeArray,
  category,
}: TravelDetailSectionProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  return (
    <div className="travel-detail-section-wrapper">
      {!isTop && <div className="section-border" />}
      <div
        className={isToggle ? "flex-container toggle" : "flex-container"}
        onClick={() => setIsOpened(!isOpened)}
        style={{
          marginTop: title === "Nearby places" && isTop ? "0px" : "16px",
        }}
      >
        <div className="title">{title}</div>
        {isToggle && (
          <ArrowIcon
            style={{ transform: isOpened ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        )}
      </div>
      {title === "About" && typeof content === "string" && (
        <div
          className={isOpened ? "content about" : "content about about-closed"}
          onClick={isOpened ? undefined : () => setIsOpened(true)}
        >
          {content.includes("<br>") ? (
            content.split("<br>").map((line, idx) => (
              <span key={idx}>
                {line}
                <br />
              </span>
            ))
          ) : content === "" ? (
            <span>-</span>
          ) : (
            <span>{content}</span>
          )}
        </div>
      )}
      {title === "Phone number" && typeof content === "string" && (
        <div className="content phonenumber">
          {content.includes("<br>") ? (
            content.split("<br>").map((line, idx) => (
              <span key={idx}>
                {line}
                <br />
              </span>
            ))
          ) : content === "" ? (
            <span>-</span>
          ) : (
            <span>{content}</span>
          )}
        </div>
      )}
      {title === "Homepage" &&
        typeof content === "string" &&
        (content === "" ? (
          <div className="content">-</div>
        ) : content.startsWith("<a") ? (
          <div
            className="content atag"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <a
            className="content homepage"
            href={content.startsWith("http") ? content : `http://${content}`}
            target="_blank"
          >
            {content}
          </a>
        ))}
      {title === "Location" && typeof content === "string" && (
        <div className="content location">
          <a
            href={`https://map.kakao.com/link/map/${name},${mapXY}`}
            target="_blank"
          >
            {content}
          </a>
          <div className="post">{`Post: ${post}`}</div>
        </div>
      )}
      {title === "Additional Information" && (
        <TravelDetailAddInfo
          content={content}
          category={category}
          isOpened={isOpened}
          setIsOpened={setIsOpened}
        />
      )}
      {title === "Places you may like" && placeArray && (
        <div className="content place">
          {placeArray.map((item: TravelNearbyType) => (
            <TravelBlock {...item} isNearby={true} key={item.contentId} />
          ))}
        </div>
      )}
      {title === "Nearby places" && placeArray && (
        <div className="content place">
          {placeArray.map((item: TravelNearbyType) => (
            <TravelBlock {...item} isNearby={true} key={item.contentId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TravelDetailSection;
