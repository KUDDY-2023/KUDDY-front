import "./pickmenu.scss";
import TravelBlock from "@components/travelpage/travelblock/index";
import { TravelType } from "@components/travelpage/travelmenu/index";
import { useState } from "react";
// GetPick, UnLike api

const PickMenu = () => {
  const [pickList, setPickList] = useState<TravelType[]>([
    {
      id: 1,
      name: "Cheonggyecheon",
      district: "Jongno",
      thumbnail:
        "https://mblogthumb-phinf.pstatic.net/MjAyMDA1MjlfMjU3/MDAxNTkwNzQwNjUwNDAz.LG_RjNhuhqDfES31GQX60XeEZXsohLRWPLXnU3iYxcMg.dVYHAJiv9-rFDEtHxzrS55021Wtdjq0L1jIwlBVPdFkg.PNG.hec_pr/55.png?type=w800",
      category: "",
    },
    {
      id: 2,
      name: "EWHA Womans University",
      district: "Seodaemun",
      thumbnail:
        "https://www.eduinnews.co.kr/news/photo/201804/9074_4551_5956.png",
      category: "",
    },
    {
      id: 3,
      name: "N Seoul Tower",
      district: "Yongsan",
      thumbnail:
        "https://ak-d.tripcdn.com/images/1i65b2215c11x5k3415B1.jpg?proc=source/trip",
      category: "",
    },
    {
      id: 4,
      name: "Cheonggyecheon",
      district: "Jongno",
      thumbnail:
        "https://mblogthumb-phinf.pstatic.net/MjAyMDA1MjlfMjU3/MDAxNTkwNzQwNjUwNDAz.LG_RjNhuhqDfES31GQX60XeEZXsohLRWPLXnU3iYxcMg.dVYHAJiv9-rFDEtHxzrS55021Wtdjq0L1jIwlBVPdFkg.PNG.hec_pr/55.png?type=w800",
      category: "",
    },
    {
      id: 5,
      name: "EWHA Womans University",
      district: "Seodaemun",
      thumbnail:
        "https://www.eduinnews.co.kr/news/photo/201804/9074_4551_5956.png",
      category: "",
    },
    {
      id: 6,
      name: "N Seoul Tower",
      district: "Yongsan",
      thumbnail:
        "https://ak-d.tripcdn.com/images/1i65b2215c11x5k3415B1.jpg?proc=source/trip",
      category: "",
    },
    {
      id: 7,
      name: "N Seoul Tower",
      district: "Yongsan",
      thumbnail:
        "https://ak-d.tripcdn.com/images/1i65b2215c11x5k3415B1.jpg?proc=source/trip",
      category: "",
    },
  ]);

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
