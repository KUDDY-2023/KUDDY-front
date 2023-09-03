import "./travel-detail-section.scss";
import TravelBlock from "@components/Travel/TravelBlock";
import {
  AdditionalInformationArray,
  AttractionInfoType,
  CultureInfoType,
  ShoppingInfoType,
  RestaurantInfoType,
  LeisureInfoType,
  FestivalInfoType,
} from "@pages/travel/TravelDetailPage/_mock";
import { ReactComponent as ArrowIcon } from "@assets/icon/arrow_down.svg";
import { useState, useEffect, useRef } from "react";

type TravelDetailSectionProps = {
  isOpen?: boolean | undefined;
  isTop?: boolean | undefined;
  title: string;
  content:
    | string
    | AttractionInfoType
    | CultureInfoType
    | ShoppingInfoType
    | RestaurantInfoType
    | LeisureInfoType
    | FestivalInfoType;
  post?: string;
  nearbyArray?: TravelNearbyType[];
  category?: string;
};

// location kakaomap navigate
const TravelDetailSection = ({
  isOpen,
  isTop,
  title,
  content,
  post,
  nearbyArray,
  category,
}: TravelDetailSectionProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const addInfoSubRef1 = useRef<HTMLDivElement>(null);
  const addInfoSubRef2 = useRef<HTMLDivElement>(null);
  const [closedAddInfoHeight, setClosedAddInfoHeight] = useState<number>(0);

  useEffect(() => {
    if (
      addInfoSubRef1.current?.offsetHeight &&
      addInfoSubRef2.current?.offsetHeight
    )
      setClosedAddInfoHeight(
        addInfoSubRef1.current?.offsetHeight +
          addInfoSubRef2.current?.offsetHeight +
          17,
      );
  }, [addInfoSubRef1, addInfoSubRef2]);

  return (
    <div className="travel-detail-section-wrapper">
      {!isTop && <div className="section-border" />}
      <div className="flex-container" onClick={() => setIsOpened(!isOpened)}>
        <div className="title">{title}</div>
        {isOpen && (
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
          {content}
        </div>
      )}
      {title === "Phone number" && typeof content === "string" && (
        <div className="content phonenumber">{content}</div>
      )}
      {title === "Homepage" && typeof content === "string" && (
        <a
          className="content homepage"
          href={content.startsWith("http") ? content : `http://${content}`}
          target="_blank"
        >
          {content}
        </a>
      )}
      {title === "Location" && typeof content === "string" && (
        <div className="content location">
          <a href="">{content}</a>
          <div className="post">{`Post: ${post}`}</div>
        </div>
      )}
      {title === "Nearby place" && nearbyArray && (
        <div className="content nearby">
          {nearbyArray.map((item: TravelNearbyType) => (
            <TravelBlock {...item} isNearby={true} key={item.contentId} />
          ))}
        </div>
      )}
      {title === "Additional Information" && typeof content !== "string" && (
        <div
          className="content addinfo"
          style={{
            overflow: isOpened ? "auto" : "hidden",
            height:
              typeof closedAddInfoHeight === "number" && isOpened
                ? "auto"
                : `${closedAddInfoHeight}px`,
          }}
          onClick={isOpened ? undefined : () => setIsOpened(true)}
        >
          {AdditionalInformationArray.map(
            item =>
              item.category === category &&
              item.contents.map((el: any, idx) => {
                if (content[el.key as keyof typeof content] !== "")
                  return (
                    <div
                      ref={
                        idx === 0
                          ? addInfoSubRef1
                          : idx === 1
                          ? addInfoSubRef2
                          : null
                      }
                      key={el.key}
                    >
                      <div className="sub-title">{`[${el.text}]`}</div>
                      <div className="sub-content">
                        {content[el.key as keyof typeof content]}
                      </div>
                    </div>
                  );
              }),
          )}
        </div>
      )}
    </div>
  );
};

export default TravelDetailSection;
