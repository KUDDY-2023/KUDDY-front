import "./travel-mates-page.scss";
import BackNavBar from "@components/_common/BackNavBar";
import TravelMatesBlock from "@components/Travel/TravelMatesBlock";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDetailPickedMates } from "@services/hooks/pick";

type roleType = "KUDDY" | "TRAVELER";
type mateTypeArrayType = {
  type: roleType;
  text: string;
  list: PickedMatesType[] | undefined;
};
const TravelMatesPage = () => {
  const { id } = useParams();
  const [matesType, setMatesType] = useState<roleType>("KUDDY");
  const { kMatesList, tMatesList, setTrigger } = useDetailPickedMates(
    Number(id),
    matesType,
  );
  const mateTypeArray: mateTypeArrayType[] = [
    { type: "KUDDY", text: "K-Buddy", list: kMatesList },
    { type: "TRAVELER", text: "Traveler", list: tMatesList },
  ];

  useEffect(() => {
    setTrigger(Date.now());
  }, [matesType]);

  return (
    <>
      <BackNavBar middleTitle="Users who picked this place" isShare={false} />
      <div className="travel-mates-selectbar-container">
        {mateTypeArray.map(item => (
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
      {mateTypeArray.find(item => matesType === item.type)!.list && (
        <div className="travel-mates-container">
          {mateTypeArray.find(item => matesType === item.type)!.list!.length ===
          0 ? (
            <div className="empty">{`No ${
              mateTypeArray.find(item => matesType === item.type)!.text
            } picked here yet`}</div>
          ) : (
            mateTypeArray
              .find(item => matesType === item.type)!
              .list!.map(mate => (
                <TravelMatesBlock {...mate} key={mate.memberId} />
              ))
          )}
        </div>
      )}
    </>
  );
};

export default TravelMatesPage;
