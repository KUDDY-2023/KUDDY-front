import "./pickmenu.scss";
import TravelBlock from "@components/travelpage/travelblock/index";
import { TravelType } from "@components/travelpage/travelmenu/index";
import { useState } from "react";
import { travelArray } from "@components/travelpage/travelmenu/index";
// GetPick, UnLike api

const PickMenu = () => {
  const [pickList, setPickList] = useState<TravelType[]>(travelArray);

  const onDelete = (id: number) => {
    // UnLike(id)
    //   .then(res => setPickList(res.data))
    //   .catch();
    setPickList(pickList.filter(item => item.id !== id));
  };

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

export default PickMenu;
