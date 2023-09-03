import "./travel-mates-page.scss";
import BackNavBar from "@components/_common/BackNavBar";
import TravelMatesBlock from "@components/Travel/TravelMatesBlock";
import { matesArrayK, matesArrayT } from "@pages/travel/TravelDetailPage/_mock";
import { useEffect, useState } from "react";

const TravelMatesPage = () => {
  const [matesType, setMatesType] = useState<string>("K-Buddy");
  const matetype = ["K-Buddy", "Traveler"];
  const [matesArray, setMatesArray] = useState<PickedMatesType[]>(matesArrayK);

  useEffect(() => {
    setMatesArray(matesType === "K-Buddy" ? matesArrayK : matesArrayT);
  }, [matesType]);

  return (
    <>
      <BackNavBar middleTitle="Mates who picked this place" isShare={false} />
      <div className="travel-mates-selectbar-container">
        {matetype.map(item => (
          <div
            className={matesType === item ? "select-btn active" : "select-btn"}
            onClick={() => setMatesType(item)}
            key={item}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="travel-mates-container">
        {matesArray.map(item => (
          <TravelMatesBlock {...item} key={item.id} />
        ))}
      </div>
    </>
  );
};

export default TravelMatesPage;
