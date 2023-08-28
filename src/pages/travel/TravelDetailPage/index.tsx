import "./travel-detail-page.scss";
import BackNavBar from "@components/_common/BackNavBar";
import { useState, useEffect } from "react";
import TravelDetailTitle from "@components/Travel/TravelDetailTitle";
import { matesArray } from "@pages/travel/TravelDetailPage/_mock";

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
  const [pickedMatesList, setPickedMatesList] =
    useState<PickedMatesType[]>(matesArray);

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
