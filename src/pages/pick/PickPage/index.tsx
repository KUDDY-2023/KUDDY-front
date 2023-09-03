import "./pick.scss";
import TopBar from "@components/_common/TopBar";
import BottomNavBar from "@components/_common/BottomNavBar";
import TravelBlock from "@components/Travel/TravelBlock";
import { useState, useEffect } from "react";
import { travelArray } from "@pages/travel/TravelPage/_mock";
// GetPick, UnLike api

const Pick = () => {
  const [pickList, setPickList] = useState<TravelPreviewType[]>(travelArray);

  const onDelete = (id: number) => {
    // UnLike(id)
    //   .then(res => setPickList(res.data))
    //   .catch();
    setPickList(pickList.filter(item => item.contentId !== id));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <TopBar />
      <div className="pickmenu-wrapper">
        <div className="inner-container">
          {pickList &&
            pickList.map(item => (
              <TravelBlock
                {...item}
                isPick={true}
                onDelete={() => onDelete(item.contentId)}
                key={item.contentId}
              />
            ))}
        </div>
      </div>
      <BottomNavBar />
    </>
  );
};

export default Pick;
