import BackNavBar from "@components/_common/BackNavBar";
import LocationListBlock from "@components/Location/LocationListBlock";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRecoilValue } from "recoil";
import { currentPosition } from "@services/store/travel";
import { useNearLocation } from "@services/hooks/spot";

const LocationListPage = () => {
  const pos = useRecoilValue<Position>(currentPosition);
  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useNearLocation(pos.y, pos.x);
  const observerRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: any) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage],
  );

  useEffect(() => {
    const element = observerRef.current;
    if (!element) return;

    const option = { threshold: 0 };
    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [fetchNextPage, hasNextPage, handleObserver]);

  return (
    <>
      <BackNavBar middleTitle="Near my location" isShare={false} />
      {isSuccess &&
        data!.pages.map(page =>
          page.spots.map((item: TravelNearbyType) => (
            <LocationListBlock {...item} key={item.contentId} />
          )),
        )}
      <div style={{ height: "40px" }} />
      <div className="loader" ref={observerRef}>
        {isFetchingNextPage && hasNextPage ? "Loading..." : "No search left"}
      </div>
    </>
  );
};

export default LocationListPage;
