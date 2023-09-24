import BackNavBar from "@components/_common/BackNavBar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TravelDetailTitle from "@components/Travel/TravelDetailTitle";
import TravelDetailSection from "@components/Travel/TravelDetailSection";

import { spotGetDetailInfo, spotGetDetailNearby } from "@services/api/spot";

const TravelDetailPage = () => {
  const { id } = useParams();
  const [isNotFound, setIsNotFound] = useState<boolean>(false);
  const [currentTravel, setCurrentTravel] = useState<
    TravelDetailType | undefined
  >();
  const [nearbyPlace, setNearbyPlace] = useState<TravelNearbyType[]>([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    spotGetDetailInfo(Number(id))
      .then(res => {
        setIsNotFound(false);
        setCurrentTravel(res.data.data);
      })
      .catch(err => setIsNotFound(true));
    if (currentTravel)
      spotGetDetailNearby(Number(id), currentTravel?.mapX, currentTravel?.mapY)
        .then(res => setNearbyPlace(res.data.data))
        .catch();
  }, [id]);

  const [sectionType, setSectionType] = useState<any[]>([]);
  useEffect(() => {
    if (currentTravel) {
      spotGetDetailNearby(Number(id), currentTravel?.mapX, currentTravel?.mapY)
        .then(res => setNearbyPlace(res.data.data))
        .catch();
      setSectionType([
        {
          title: "About",
          key: "about",
          option: { isToggle: true, isTop: true },
        },
        { title: "Phone number", key: "phoneNum", option: null },
        { title: "Homepage", key: "homepage", option: null },
        {
          title: "Location",
          key: "location",
          option: {
            post: currentTravel["post"],
            name: currentTravel["name"],
            mapXY: `${currentTravel["mapY"]},${currentTravel["mapX"]}`,
          },
        },
        {
          title: "Additional Information",
          key: "additionalInfo",
          option: {
            isToggle: true,
            category: currentTravel["category"],
          },
        },
      ]);
    }
  }, [currentTravel]);

  return (
    <>
      <BackNavBar middleTitle="" isShare={true} />
      {isNotFound ? (
        <div>Not Found</div>
      ) : (
        currentTravel && (
          <>
            <TravelDetailTitle {...currentTravel} />
            {sectionType.map(item => (
              <TravelDetailSection
                title={item.title}
                content={currentTravel[item.key as keyof TravelDetailType]}
                {...item.option}
                key={item.title}
              />
            ))}
            {nearbyPlace && (
              <TravelDetailSection
                title="Nearby places"
                content=""
                nearbyArray={nearbyPlace}
              />
            )}
          </>
        )
      )}
      <div style={{ height: "100px" }} />
    </>
  );
};

export default TravelDetailPage;
