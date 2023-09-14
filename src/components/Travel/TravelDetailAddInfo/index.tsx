import "@components/Travel/TravelDetailSection/travel-detail-section.scss";
import { AdditionalInformationTypeArray } from "@pages/travel/TravelDetailPage/_mock";
import { useState, useEffect, useRef } from "react";

type TravelDetailAddInfoProps = {
  content: any;
  category: string | undefined;
  isOpened: boolean;
  setIsOpened: (value: boolean) => void;
};

const TravelDetailAddInfo = ({
  content,
  category,
  isOpened,
  setIsOpened,
}: TravelDetailAddInfoProps) => {
  const [additionalInfoList, setAdditionalInfoList] = useState<any[]>([]);
  const [closedAddInfoHeight, setClosedAddInfoHeight] = useState<number>(0);
  const addInfoSubRef1 = useRef<HTMLDivElement>(null);
  const addInfoSubRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof content !== "string")
      AdditionalInformationTypeArray.map(
        item =>
          item.category === category &&
          setAdditionalInfoList(
            item.contents.filter(
              el => content[el.key as keyof typeof content] !== "",
            ),
          ),
      );
  }, [content]);

  useEffect(() => {
    if (additionalInfoList.length <= 2) setIsOpened(true);
    else setIsOpened(false);
    if (additionalInfoList.length >= 2) {
      if (addInfoSubRef1.current && addInfoSubRef2.current) {
        setClosedAddInfoHeight(
          addInfoSubRef1.current!.offsetHeight +
            addInfoSubRef2.current!.offsetHeight +
            17,
        );
      }
    }
  }, [additionalInfoList]);

  return (
    <>
      {additionalInfoList && (
        <div
          className="content addinfo"
          style={{
            overflow: isOpened ? "auto" : "hidden",
            height:
              (typeof closedAddInfoHeight === "number" && isOpened) ||
              additionalInfoList.length < 2
                ? "auto"
                : `${closedAddInfoHeight}px`,
          }}
          onClick={isOpened ? undefined : () => setIsOpened(true)}
        >
          {additionalInfoList.map((el: any, idx) => (
            <div
              ref={
                idx === 0 ? addInfoSubRef1 : idx === 1 ? addInfoSubRef2 : null
              }
              key={el.key}
            >
              <div className="sub-title">{`[${el.text}]`}</div>
              <div className="sub-content">
                {String(content[el.key as keyof typeof content]).includes(
                  "<br>",
                ) ||
                String(content[el.key as keyof typeof content]).includes(
                  "<br />",
                ) ? (
                  String(content[el.key as keyof typeof content])
                    .split("<br>")
                    .map((line: string, idx: number) => (
                      <span key={idx}>
                        {line.includes("<br />") ? (
                          line
                            .split("<br />")
                            .map((line: string, idx: number) => (
                              <span key={idx}>
                                {line}
                                <br />
                              </span>
                            ))
                        ) : (
                          <span>{line}</span>
                        )}
                        <br />
                      </span>
                    ))
                ) : (
                  <span>{content[el.key as keyof typeof content]}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TravelDetailAddInfo;
