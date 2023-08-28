import "./pick.scss";
import TravelBlock from "@components/TravelPage/TravelBlock/index";
import { TravelType } from "@components/TravelPage/index";
import { useState, useEffect } from "react";
import { travelArray } from "@components/TravelPage/index";
// GetPick, UnLike api

const Pick = () => {
  const [pickList, setPickList] = useState<TravelType[]>(travelArray);

  const onDelete = (id: number) => {
    // UnLike(id)
    //   .then(res => setPickList(res.data))
    //   .catch();
    setPickList(pickList.filter(item => item.id !== id));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pickmenu-wrapper">
      <div className="inner-container">
        {pickList &&
          pickList.map(item => (
            <TravelBlock
              {...item}
              isPick={true}
              onDelete={() => onDelete(item.id)}
              key={item.id}
            />
          ))}
      </div>
    </div>
  );
};

export default Pick;
