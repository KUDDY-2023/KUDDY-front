import "./travel-detail.scss";
import BackNavBar from "@components/_common/BackNavBar";

export type PickedMates = {
  id: number;
};

export type TravelDetailType = {
  id: number;
  name: string;
  district: string;
  thumbnail: string;
  category: string;
  is_picked: boolean;
  mates: PickedMates[];
};

const TravelDetailMenu = () => {
  return (
    <>
      <BackNavBar middleTitle="" isShare={true} />
    </>
  );
};

export default TravelDetailMenu;
