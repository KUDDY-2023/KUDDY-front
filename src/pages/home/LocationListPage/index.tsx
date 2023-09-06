import BackNavBar from "@components/_common/BackNavBar";
import LocationListBlock from "@components/Location/LocationListBlock";
import { locationArray } from "./_mock";

const LocationListPage = () => {
  return (
    <>
      <BackNavBar middleTitle="Near my location" isShare={false} />
      {locationArray.data.map(item => (
        <LocationListBlock {...item} />
      ))}
      <div style={{ height: "40px" }} />
    </>
  );
};

export default LocationListPage;
