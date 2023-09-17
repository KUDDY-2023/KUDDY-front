import BackNavBar from "@components/_common/BackNavBar";
import LocationListBlock from "@components/Location/LocationListBlock";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useNearLocation } from "@services/hooks/spot";
import { useRecoilState } from "recoil";
import { currentPosition } from "@services/store/travel";

const LocationListPage = () => {
  const [pos, setPos] = useRecoilState(currentPosition);
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(pos);
  useEffect(() => {
    setPos({
      x: Number(searchParams.get("x")),
      y: Number(searchParams.get("y")),
    });
  }, [searchParams]);
  const { pageLastItemRef, hasNextPage, data } = useNearLocation(pos);

  return (
    <>
      <BackNavBar middleTitle="Near my location" isShare={false} />
      {data &&
        data.pages.map(page =>
          page.data.data.spots.length === 0 ? (
            <div className="empty">
              <div className="no-result">No result</div>
            </div>
          ) : (
            page.data.data.spots.map((item: TravelNearbyType, idx: number) =>
              page.data.data.pageInfo.size === idx + 1 ? (
                <div key={item.contentId} ref={pageLastItemRef}>
                  <LocationListBlock {...item} />
                </div>
              ) : (
                <LocationListBlock {...item} key={item.contentId} />
              ),
            )
          ),
        )}
      {data && !hasNextPage && data.pages[0].data.data.spots.length !== 0 && (
        <div>end of list</div>
      )}
    </>
  );
};

export default LocationListPage;
