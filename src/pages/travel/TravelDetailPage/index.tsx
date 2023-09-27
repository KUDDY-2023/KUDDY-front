import BackNavBar from "@components/_common/BackNavBar";
import Loading from "@components/_common/Loading";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TravelDetailTitle from "@components/Travel/TravelDetailTitle";
import TravelDetailSection from "@components/Travel/TravelDetailSection";

import { useDetailSpot } from "@services/hooks/spot";

const TravelDetailPage = () => {
  const { id } = useParams();
  const {
    data,
    isLoading,
    isFetching,
    isError,
    nearbyData,
    matesPreview,
    refetch,
  } = useDetailSpot(Number(id));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const [sectionType, setSectionType] = useState<any[]>([]);
  useEffect(() => {
    if (data) {
      setSectionType([
        {
          title: "About",
          key: "about",
          option: { isToggle: true, isTop: true },
        },
        { title: "Phone number", key: "phoneNum", option: null },
        { title: "Homepage", key: "homepage", option: null },
        {
          title: "Location",
          key: "location",
          option: {
            post: data.data.data["post"],
            name: data.data.data["name"],
            mapXY: `${data.data.data["mapY"]},${data.data.data["mapX"]}`,
          },
        },
        {
          title: "Additional Information",
          key: "additionalInfo",
          option: {
            isToggle: true,
            category: data.data.data["category"],
          },
        },
      ]);
    }
  }, [data]);

  const style = {
    width: "100%",
    height: "calc(100svh - 120px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <>
      <BackNavBar middleTitle="" isShare={true} />
      {isError ? (
        <div style={style}>Not Found</div>
      ) : isLoading ? (
        <div style={style}>
          <Loading backColor="transparent" spinnerColor="#eee" size="30px" />
        </div>
      ) : (
        data && (
          <>
            <TravelDetailTitle
              {...data.data.data}
              matesPreview={matesPreview}
              refetch={refetch}
            />
            {sectionType.map(item => (
              <TravelDetailSection
                title={item.title}
                content={data.data.data[item.key as keyof TravelDetailType]}
                {...item.option}
                key={item.title}
              />
            ))}
            {nearbyData && (
              <TravelDetailSection
                title="Nearby places"
                content=""
                nearbyArray={nearbyData.data.data}
              />
            )}
            <div style={{ height: "100px" }} />
          </>
        )
      )}
    </>
  );
};

export default TravelDetailPage;
