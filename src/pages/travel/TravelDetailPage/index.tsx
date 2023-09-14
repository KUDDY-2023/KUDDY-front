import BackNavBar from "@components/_common/BackNavBar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TravelDetailTitle from "@components/Travel/TravelDetailTitle";
import { matesArrayK, matesArrayT } from "@pages/travel/TravelDetailPage/_mock";
import TravelDetailSection from "@components/Travel/TravelDetailSection";

import { spotGetDetailInfo } from "@services/api/spot";

const TravelDetailPage = () => {
  const { id } = useParams();
  const [currentTravel, setCurrentTravel] = useState<
    TravelDetailType | undefined
  >();

  useEffect(() => {
    window.scrollTo(0, 0);
    spotGetDetailInfo(Number(id)).then(res => setCurrentTravel(res.data.data));
  }, []);
  console.log(currentTravel);

  return (
    <>
      <BackNavBar middleTitle="" isShare={true} />
      {currentTravel && (
        <>
          <TravelDetailTitle {...currentTravel} />
          <TravelDetailSection
            isOpen={true}
            isTop={true}
            title="About"
            content={currentTravel.about}
          />
          <TravelDetailSection
            title="Phone number"
            content={currentTravel.phoneNum}
          />
          <TravelDetailSection
            title="Homepage"
            content={currentTravel.homepage}
          />
          <TravelDetailSection
            title="Location"
            content={currentTravel.location}
            post={currentTravel.post}
          />
          <TravelDetailSection
            isOpen={true}
            title="Additional Information"
            content={currentTravel.additionalInfo}
            category={currentTravel.category}
          />
          <TravelDetailSection
            title="Nearby place"
            content=""
            nearbyArray={currentTravel.nearbyPlace}
          />
        </>
      )}
      <div style={{ height: "100px" }} />
    </>
  );
};

export default TravelDetailPage;
