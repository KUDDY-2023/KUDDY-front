import "./travel-detail-page.scss";
import BackNavBar from "@components/_common/BackNavBar";
import { useState, useEffect } from "react";
import { TravelType } from "@pages/travel/TravelPage";
import TravelDetailTitle from "../../../components/Travel/TravelDetailTitle";

export type MatesType = {
  id: number;
  type: string;
  nickname: string;
  profileImg: string;
  introduce: string;
};

export type TravelDetailType = {
  id: number;
  name: string;
  district: string;
  imageList: string[];
  category: string;
  about: string;
  phoneNum: string;
  homepage: string;
  location: string;
  post: string;
  nearbyPlace: TravelType[];
};

const TravelDetailPage = () => {
  const [currentTravel, setCurrentTravel] = useState<TravelDetailType>({
    id: 1,
    name: "Gyeongbokgung Palace",
    district: "Jongno",
    imageList: [""],
    category: "Attraction",
    about: "",
    phoneNum: "",
    homepage: "",
    location: "",
    post: "",
    nearbyPlace: [
      {
        id: 1,
        contentId: 1,
        name: "",
        district: "Jongno",
        category: "",
        imageUrl: "",
      },
    ],
  });
  const [pickedMatesList, setPickedMatesList] = useState<MatesType[]>([
    {
      id: 1,
      type: "K-Buddy",
      nickname: "Lee",
      profileImg: "",
      introduce: "abcde",
    },
    {
      id: 2,
      type: "K-Buddy",
      nickname: "Kim",
      profileImg: "",
      introduce: "abcdeabcde",
    },
    {
      id: 3,
      type: "K-Buddy",
      nickname: "Park",
      profileImg: "",
      introduce: "abcdeabcdeabcde",
    },
    {
      id: 4,
      type: "K-Buddy",
      nickname: "Choi",
      profileImg: "",
      introduce: "abcdeabcde",
    },
    {
      id: 5,
      type: "Traveler",
      nickname: "mark",
      profileImg: "",
      introduce: "abcdeabcdeabcde",
    },
    {
      id: 6,
      type: "Traveler",
      nickname: "jane",
      profileImg: "",
      introduce: "abcde",
    },
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <BackNavBar middleTitle="" isShare={true} />
      <TravelDetailTitle />
    </>
  );
};

export default TravelDetailPage;
