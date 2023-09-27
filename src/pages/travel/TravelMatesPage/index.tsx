import "./travel-mates-page.scss";
import BackNavBar from "@components/_common/BackNavBar";
import TravelMatesBlock from "@components/Travel/TravelMatesBlock";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDetailSpot } from "@services/hooks/spot";

type roleType = "KUDDY" | "TRAVELER";
type mateTypeArrayType = {
  type: roleType;
  text: string;
  list: PickedMatesType[] | undefined;
};
const TravelMatesPage = () => {
  const { id } = useParams();
  const [matesType, setMatesType] = useState<roleType>("KUDDY");
  const { data } = useDetailSpot(Number(id));
  const [matesArray, setMatesArray] = useState<mateTypeArrayType[]>([
    { type: "KUDDY", text: "K-Buddy", list: [] },
    { type: "TRAVELER", text: "Traveler", list: [] },
  ]);
  useEffect(() => {
    if (!data) return;
    setMatesArray([
      { type: "KUDDY", text: "K-Buddy", list: data.data.data.kuddyList },
      { type: "TRAVELER", text: "Traveler", list: data.data.data.travelerList },
    ]);
  }, []);
  return (
    <>
      <BackNavBar middleTitle="Users who picked this place" isShare={false} />
      <div className="travel-mates-selectbar-container">
        {matesArray.map(item => (
          <div
            className={
              matesType === item.type ? "select-btn active" : "select-btn"
            }
            onClick={() => setMatesType(item.type)}
            key={item.type}
          >
            {item.text}
          </div>
        ))}
      </div>
      {matesArray.find(item => matesType === item.type)!.list && (
        <div className="travel-mates-container">
          {matesArray.find(item => matesType === item.type)!.list!.length ===
          0 ? (
            <div className="empty">{`No ${
              matesArray.find(item => matesType === item.type)!.text
            } picked here yet`}</div>
          ) : (
            matesArray
              .find(item => matesType === item.type)!
              .list!.map((mate: PickedMatesType) => (
                <TravelMatesBlock {...mate} key={mate.memberId} />
              ))
          )}
        </div>
      )}
    </>
  );
};

export default TravelMatesPage;
